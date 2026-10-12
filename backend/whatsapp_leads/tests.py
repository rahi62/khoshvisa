import hashlib
import hmac
import json

from django.core.exceptions import ValidationError
from django.test import TestCase, override_settings
from django.utils import timezone

from content.models import Lead
from .models import LeadStatusHistory, WhatsAppContact, WhatsAppInboundEvent

WEBHOOK = "/api/whatsapp/webhook/"
SECRET = "test_meta_app_secret_not_for_production"
TOKEN = "test_challenge_token_not_for_production"
NUMBER_ID = "123456789876"


def make_payload(message_id="wamid.HBgAAA1", from_number="989121112233", phone_id=NUMBER_ID, text=None):
    if text is None:
        text = (
            "سلام، از سایت خوش‌ویزا برای راهنمایی ویزا پیام می‌دهم.\n"
            "مقصد: کانادا\n"
            "هدف سفر: گردشگری\n"
            "زمان تقریبی سفر: کمتر از ۳ ماه آینده\n"
            "نام: کاربر نمونه\n"
            "صفحه ورود: /canada-tourist-visa/\n"
            "کد پیگیری: KV-0123456789ABCDEFABCD"
        )
    return {
        "object": "whatsapp_business_account",
        "entry": [{
            "changes": [{
                "field": "messages",
                "value": {
                    "metadata": {"phone_number_id": phone_id},
                    "contacts": [{"wa_id": from_number, "profile": {"name": "نام واتساپ"}}],
                    "messages": [
                        {"id": message_id, "from": from_number, "type": "text", "text": {"body": text}}
                    ],
                }
            }]
        }]
    }


@override_settings(
    WHATSAPP_APP_SECRET=SECRET,
    WHATSAPP_WEBHOOK_VERIFY_TOKEN=TOKEN,
    WHATSAPP_PHONE_NUMBER_ID=NUMBER_ID,
)
class WhatsAppWebhookTests(TestCase):
    def post_payload(self, payload, sign=True):
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        signature = "sha256=" + hmac.new(SECRET.encode(), raw, hashlib.sha256).hexdigest()
        args = {"HTTP_X_HUB_SIGNATURE_256": signature} if sign else {}
        return self.client.post(WEBHOOK, data=raw, content_type="application/json", **args)

    def test_valid_verify_challenge(self):
        response = self.client.get(WEBHOOK, {
            "hub.mode": "subscribe", "hub.verify_token": TOKEN, "hub.challenge": "123456",
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"123456")

    def test_invalid_verify_challenge(self):
        response = self.client.get(WEBHOOK, {
            "hub.mode": "subscribe", "hub.verify_token": "wrong", "hub.challenge": "123456",
        })
        self.assertEqual(response.status_code, 403)

    def test_webhook_rejects_missing_signature(self):
        r = self.post_payload(make_payload(), sign=False)
        self.assertEqual(r.status_code, 403)
        self.assertEqual(Lead.objects.count(), 0)

    def test_webhook_rejects_modified_signature(self):
        raw = b'{"object":"whatsapp_business_account"}'
        r = self.client.post(
            WEBHOOK, data=raw, content_type="application/json",
            HTTP_X_HUB_SIGNATURE_256="sha256=" + "0" * 64,
        )
        self.assertEqual(r.status_code, 403)

    def test_inbound_message_creates_trackable_lead_and_no_partner_consent(self):
        r = self.post_payload(make_payload())
        self.assertEqual(r.status_code, 200)
        self.assertEqual(Lead.objects.count(), 1)
        lead = Lead.objects.get()
        self.assertEqual(lead.source, "whatsapp")
        self.assertEqual(lead.phone, "+989121112233")
        self.assertEqual(lead.status, "new")
        self.assertTrue(lead.consent)  # user initiated conversation, not consent for referral
        self.assertEqual(lead.landing_path, "/canada-tourist-visa/")
        self.assertNotIn("کاربر نمونه", lead.message)  # full incoming message intentionally not stored
        contact = WhatsAppContact.objects.get(lead=lead)
        self.assertFalse(contact.partner_share_consent)
        self.assertIsNone(contact.forwarded_at)
        self.assertEqual(contact.destination, "کانادا")
        self.assertEqual(contact.message_count, 1)
        self.assertEqual(contact.tracking_reference, "KV-0123456789ABCDEFABCD")
        self.assertEqual(WhatsAppInboundEvent.objects.count(), 1)

    def test_same_message_id_is_idempotent(self):
        self.post_payload(make_payload())
        self.post_payload(make_payload())
        self.assertEqual(Lead.objects.count(), 1)
        self.assertEqual(WhatsAppInboundEvent.objects.count(), 1)
        self.assertEqual(WhatsAppContact.objects.get().message_count, 1)

    def test_second_real_message_increments_count_and_keeps_status(self):
        self.post_payload(make_payload())
        lead = Lead.objects.get()
        lead.status = "qualified"
        lead.save(update_fields=["status"])
        self.post_payload(make_payload(message_id="wamid.HBgAAA2", text="سلام، ممنون"))
        self.assertEqual(Lead.objects.count(), 1)
        self.assertEqual(WhatsAppContact.objects.get().message_count, 2)
        lead.refresh_from_db()
        self.assertEqual(lead.status, "qualified")

    def test_wrong_business_number_is_ignored(self):
        r = self.post_payload(make_payload(phone_id="00000000"))
        self.assertEqual(r.status_code, 200)
        self.assertEqual(Lead.objects.count(), 0)

    def test_unsupported_status_events_do_not_create_leads(self):
        r = self.post_payload({"object": "whatsapp_business_account", "entry": [{
            "changes": [{"field": "messages", "value": {
                "metadata": {"phone_number_id": NUMBER_ID},
                "statuses": [{"id": "wamid.HBgAAA3", "status": "delivered"}]
            }}]
        }]})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(Lead.objects.count(), 0)

    def test_rejects_oversized_request(self):
        body = b"a" * 65537
        signature = "sha256=" + hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()
        r = self.client.post(WEBHOOK, data=body, content_type="application/json",
                             HTTP_X_HUB_SIGNATURE_256=signature)
        self.assertEqual(r.status_code, 413)

    def test_follow_up_requires_a_due_date_for_whatsapp(self):
        self.post_payload(make_payload())
        lead = Lead.objects.get()
        lead.status = "follow_up"
        with self.assertRaises(ValidationError):
            lead.full_clean()
        lead.follow_up_at = timezone.now()
        lead.full_clean()

    def test_referral_requires_separate_evidenced_consent(self):
        self.post_payload(make_payload())
        lead = Lead.objects.get()
        contact = WhatsAppContact.objects.get()
        lead.status = "referred"
        with self.assertRaises(ValidationError):
            lead.full_clean()
        contact.partner_share_consent = True
        with self.assertRaises(ValidationError):
            contact.full_clean()  # no evidence
        contact.partner_share_consent_evidence = "رضایت جداگانه در مکالمه رسمی، تاریخ و ساعت ثبت شد."
        contact.partner_share_consent_at = timezone.now()
        contact.full_clean()
        contact.save()
        with self.assertRaises(ValidationError):
            lead.full_clean()  # consent alone is NOT evidence the data was forwarded
        contact.forwarded_partner = "مجموعه همکار آزمایشی"
        contact.forwarded_at = timezone.now()
        contact.full_clean()
        contact.save()
        lead.full_clean()
        lead.save(update_fields=["status"])
