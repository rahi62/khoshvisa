from django.contrib import admin
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils import timezone
from django.utils.html import format_html

from .models import LeadStatusHistory, WhatsAppContact, WhatsAppInboundEvent


@admin.register(WhatsAppContact)
class WhatsAppContactAdmin(admin.ModelAdmin):
    list_display = (
        "wa_id", "tracking_reference", "destination", "purpose", "message_count",
        "lead_status", "lead_link", "partner_share_consent", "last_inbound_at",
    )
    list_filter = ("partner_share_consent", "last_inbound_at", "lead__status")
    search_fields = ("wa_id", "tracking_reference", "destination", "lead__phone", "lead__full_name")
    readonly_fields = (
        "wa_id", "lead_link", "tracking_reference", "destination", "purpose",
        "travel_window", "first_inbound_at", "last_inbound_at", "message_count",
        "partner_share_consent_at",
    )
    fieldsets = (
        ("پیام‌های واتساپ (اطلاعات غیرقابل ویرایش)", {
            "fields": ("lead_link", "wa_id", "tracking_reference", "destination", "purpose", "travel_window", "first_inbound_at", "last_inbound_at", "message_count"),
        }),
        ("اشتراک اطلاعات با ارائه‌دهنده مستقل (فقط با رضایت ثبت‌شده)", {
            "fields": ("partner_share_consent", "partner_share_consent_evidence", "partner_share_consent_at", "forwarded_partner", "forwarded_at"),
            "description": "ارسال اطلاعات خودکار نیست. ابتدا رضایت واقعی و مستند متقاضی را بگیرید؛ این فرم فقط سابقه انتقال را ثبت می‌کند.",
        }),
    )

    @admin.display(description="وضعیت")
    def lead_status(self, obj):
        return obj.lead.get_status_display() if obj.lead_id else "بدون پرونده"

    @admin.display(description="پرونده و یادداشت پیگیری")
    def lead_link(self, obj):
        if not obj.lead_id:
            return "—"
        url = reverse("admin:content_lead_change", args=[obj.lead_id])
        return format_html('<a href="{}">مشاهده / تغییر وضعیت درخواست #{}</a>', url, obj.lead_id)

    def has_add_permission(self, request):
        # All records must originate from a signed inbound webhook.
        return False

    def has_delete_permission(self, request, obj=None):
        # Use the explicit retention/purge process rather than ad hoc deletion.
        return False

    def save_model(self, request, obj, form, change):
        if obj.partner_share_consent and not obj.partner_share_consent_at:
            obj.partner_share_consent_at = timezone.now()
        if not obj.partner_share_consent:
            obj.partner_share_consent_at = None
        obj.full_clean()
        super().save_model(request, obj, form, change)


@admin.register(WhatsAppInboundEvent)
class WhatsAppInboundEventAdmin(admin.ModelAdmin):
    list_display = ("message_id", "sender_wa_id", "kind", "received_at")
    list_filter = ("kind", "received_at")
    readonly_fields = ("message_id", "sender_wa_id", "kind", "contact", "received_at")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(LeadStatusHistory)
class LeadStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ("lead", "from_status", "to_status", "changed_by", "changed_at")
    list_filter = ("to_status", "changed_at")
    readonly_fields = ("lead", "from_status", "to_status", "changed_by", "changed_at")
    search_fields = ("lead__full_name", "lead__phone", "lead__id")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
