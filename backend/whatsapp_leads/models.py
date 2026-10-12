import re

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


class WhatsAppContact(models.Model):
    """Minimal WhatsApp metadata. Never store inbound document/image/raw payloads."""

    lead = models.OneToOneField(
        "content.Lead", on_delete=models.CASCADE, related_name="whatsapp_contact",
        null=True, blank=True,
    )
    wa_id = models.CharField("شناسه حساب واتساپ", max_length=24, unique=True)
    tracking_reference = models.CharField("کد پیگیری سایت", max_length=32, blank=True, db_index=True)
    destination = models.CharField("مقصد", max_length=80, blank=True)
    purpose = models.CharField("هدف سفر", max_length=80, blank=True)
    travel_window = models.CharField("زمان سفر", max_length=80, blank=True)
    first_inbound_at = models.DateTimeField("اولین پیام", default=timezone.now)
    last_inbound_at = models.DateTimeField("آخرین پیام", default=timezone.now)
    message_count = models.PositiveIntegerField("پیام‌های دریافت‌شده", default=0)

    # This is NOT implied by sending a WhatsApp message.
    partner_share_consent = models.BooleanField("رضایت جداگانه اشتراک با ارائه‌دهنده مستقل", default=False)
    partner_share_consent_evidence = models.TextField("ثبت مستند رضایت", blank=True)
    partner_share_consent_at = models.DateTimeField("تاریخ رضایت انتقال", null=True, blank=True)
    forwarded_partner = models.CharField("شناسه/نام ارائه‌دهنده مستقل", max_length=160, blank=True)
    forwarded_at = models.DateTimeField("تاریخ اشتراک اطلاعات", null=True, blank=True)

    class Meta:
        verbose_name = "مکالمه واتساپ"
        verbose_name_plural = "مکالمات واتساپ"
        ordering = ("-last_inbound_at",)

    def clean(self):
        errors = {}
        if not re.fullmatch(r"[1-9][0-9]{7,14}", self.wa_id or ""):
            errors["wa_id"] = "شناسه واتساپ باید عدد بین‌المللی معتبر بدون علامت + باشد."
        if self.partner_share_consent and not self.partner_share_consent_evidence.strip():
            errors["partner_share_consent_evidence"] = "ثبت مستند رضایت قبل از انتقال الزامی است."
        if self.forwarded_at is not None:
            if not self.partner_share_consent:
                errors["partner_share_consent"] = "اشتراک اطلاعات بدون رضایت جداگانه مجاز نیست."
            if not self.forwarded_partner.strip():
                errors["forwarded_partner"] = "مشخصات گیرنده مستقل را ثبت کنید."
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f"{self.wa_id} · {self.tracking_reference or 'بدون کد سایت'}"


class WhatsAppInboundEvent(models.Model):
    """Deduplicates provider webhooks; no raw inbound message stored."""

    message_id = models.CharField(max_length=190, unique=True)
    sender_wa_id = models.CharField(max_length=24)
    kind = models.CharField(max_length=32, blank=True)
    contact = models.ForeignKey(
        WhatsAppContact, related_name="events", null=True, blank=True,
        on_delete=models.CASCADE,
    )
    received_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "رخداد پیام واتساپ"
        verbose_name_plural = "رخدادهای پیام واتساپ"
        ordering = ("-received_at",)


class LeadStatusHistory(models.Model):
    """Admin-side audit of real lead status transitions."""

    lead = models.ForeignKey("content.Lead", on_delete=models.CASCADE, related_name="status_history")
    from_status = models.CharField(max_length=30, blank=True)
    to_status = models.CharField(max_length=30)
    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL,
    )
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-changed_at",)
        verbose_name = "تغییر وضعیت درخواست"
        verbose_name_plural = "تاریخچه وضعیت درخواست"
