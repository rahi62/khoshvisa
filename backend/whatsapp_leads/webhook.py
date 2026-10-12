"""Meta WhatsApp Business Platform webhook.

Security properties:
* GET challenge requires an operator-set verify token.
* POST requires a byte-for-byte HMAC-SHA256 signature with the Meta App Secret.
* Phone-number ID must match the configured receiving business account.
* An inbound message is recorded only after WhatsApp actually delivers it.
* No raw texts, attachments, or credentials are saved.
* Re-deliveries are deduplicated by WhatsApp's message ID.
* Forwarding to a third-party provider is never automated.
"""
import hashlib
import hmac
import json
import re

from django.conf import settings
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from content.models import Lead
from .models import WhatsAppContact, WhatsAppInboundEvent

MAX_BYTES = 65536
WA_ID_RE = re.compile(r"^[1-9][0-9]{7,14}$")
REFERENCE_RE = re.compile(r"^KV-[A-F0-9]{20}$")
LANDING_RE = re.compile(r"^/[a-z0-9/-]{0,230}$")


def _str(value, limit):
    if not isinstance(value, str):
        return ""
    return re.sub(r"\s+", " ", value).strip()[:limit]


def _field(message_text, title, max_len):
    for line in message_text.splitlines()[:20]:
        if line.startswith(title + ":"):
            return _str(line[len(title) + 1:], max_len)
    return ""


def _store_inbound(payload, profile_name):
    message_id = _str(payload.get("id"), 190)
    sender = _str(payload.get("from"), 24)
    if not message_id or not WA_ID_RE.fullmatch(sender):
        return

    kind = _str(payload.get("type"), 32)
    text_body = ""
    if kind == "text" and isinstance(payload.get("text"), dict):
        # Only parse structured, small text messages. Never store the original payload.
        text_body = payload["text"].get("body", "")
        if not isinstance(text_body, str):
            text_body = ""
        text_body = text_body[:4000]
    ref = _field(text_body, "کد پیگیری", 32).upper()
    if not REFERENCE_RE.fullmatch(ref):
        ref = ""
    destination = _field(text_body, "مقصد", 80)
    purpose = _field(text_body, "هدف سفر", 80)
    travel_window = _field(text_body, "زمان تقریبی سفر", 80)
    name = _field(text_body, "نام", 120) or _str(profile_name, 120)
    landing = _field(text_body, "صفحه ورود", 240)
    if not LANDING_RE.fullmatch(landing):
        landing = ""

    with transaction.atomic():
        event, first_seen = WhatsAppInboundEvent.objects.get_or_create(
            message_id=message_id,
            defaults={"sender_wa_id": sender, "kind": kind},
        )
        if not first_seen:
            return
        contact, _ = WhatsAppContact.objects.get_or_create(wa_id=sender)
        # Serialize updates per sender on PostgreSQL to avoid lost message counts.
        contact = WhatsAppContact.objects.select_for_update().get(pk=contact.pk)
        if contact.lead_id is None:
            lead = Lead.objects.create(
                full_name=name or "مخاطب واتساپ",
                phone="+" + sender,
                service=" / ".join(x for x in (destination, purpose) if x)[:180],
                message="درخواست واقعی از پیام ورودی واتساپ؛ متن و فایل پیام ذخیره نشده‌اند.",
                status="new",
                source="whatsapp",
                landing_path=landing or "/consultation/",
                # User initiated conversation, NOT consent to third-party disclosure.
                consent=True,
            )
            contact.lead = lead
        else:
            lead = contact.lead
            if not lead.service and (destination or purpose):
                lead.service = " / ".join(x for x in (destination, purpose) if x)[:180]
                lead.save(update_fields=["service", "updated_at"])
        if ref and not contact.tracking_reference:
            contact.tracking_reference = ref
        if destination and not contact.destination:
            contact.destination = destination
        if purpose and not contact.purpose:
            contact.purpose = purpose
        if travel_window and not contact.travel_window:
            contact.travel_window = travel_window
        contact.last_inbound_at = timezone.now()
        contact.message_count += 1
        contact.save()
        event.contact = contact
        event.save(update_fields=["contact"])


@method_decorator(csrf_exempt, name="dispatch")
class WhatsAppWebhookView(View):
    http_method_names = ["get", "post"]

    def get(self, request):
        expected = getattr(settings, "WHATSAPP_WEBHOOK_VERIFY_TOKEN", "")
        mode = request.GET.get("hub.mode", "")
        supplied = request.GET.get("hub.verify_token", "")
        challenge = request.GET.get("hub.challenge", "")
        if not expected:
            return HttpResponse("webhook not configured", status=503)
        if (
            mode != "subscribe"
            or not hmac.compare_digest(supplied, expected)
            or not challenge.isdigit()
            or len(challenge) > 64
        ):
            return HttpResponse("verification failed", status=403)
        return HttpResponse(challenge, content_type="text/plain; charset=utf-8")

    def post(self, request):
        secret = getattr(settings, "WHATSAPP_APP_SECRET", "")
        business_phone_id = getattr(settings, "WHATSAPP_PHONE_NUMBER_ID", "")
        if not secret or not business_phone_id:
            return JsonResponse({"detail": "webhook not configured"}, status=503)
        header_length = request.META.get("CONTENT_LENGTH", "")
        if header_length.isdigit() and int(header_length) > MAX_BYTES:
            return JsonResponse({"detail": "payload too large"}, status=413)
        raw = request.body
        if len(raw) > MAX_BYTES:
            return JsonResponse({"detail": "payload too large"}, status=413)
        signature = request.headers.get("X-Hub-Signature-256", "")
        expected = "sha256=" + hmac.new(secret.encode("utf-8"), raw, hashlib.sha256).hexdigest()
        if not signature or not hmac.compare_digest(signature, expected):
            return JsonResponse({"detail": "signature invalid"}, status=403)
        try:
            payload = json.loads(raw)
        except (ValueError, UnicodeDecodeError):
            return JsonResponse({"detail": "invalid payload"}, status=400)
        if not isinstance(payload, dict) or payload.get("object") != "whatsapp_business_account":
            return JsonResponse({"received": True})

        for entry in payload.get("entry", [])[:10]:
            if not isinstance(entry, dict):
                continue
            for change in entry.get("changes", [])[:10]:
                if not isinstance(change, dict) or change.get("field") != "messages":
                    continue
                value = change.get("value")
                if not isinstance(value, dict):
                    continue
                metadata = value.get("metadata") or {}
                if not isinstance(metadata, dict):
                    continue
                if str(metadata.get("phone_number_id", "")) != business_phone_id:
                    continue
                profiles = {
                    c.get("wa_id"): (c.get("profile") or {}).get("name", "")
                    for c in value.get("contacts", [])[:25]
                    if isinstance(c, dict) and isinstance(c.get("profile"), dict)
                }
                for msg in value.get("messages", [])[:25]:
                    if isinstance(msg, dict):
                        _store_inbound(msg, profiles.get(msg.get("from"), ""))

        return JsonResponse({"received": True})
