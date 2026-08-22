from django.contrib import admin
from .models import FAQ, LandingPage, Lead, SiteSettings, Testimonial, TrustItem


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("brand_name", "mobile", "phone", "updated_at")
    fieldsets = (
        ("برند", {"fields": ("brand_name", "brand_name_en", "tagline", "brand_description", "logo", "logo_dark", "favicon", "primary_color", "accent_color", "default_og_image", "site_domain")}),
        ("تایپوگرافی و فونت", {"fields": ("font_family_name", "font_file", "font_weight", "google_font_url"), "description": "فونت WOFF2 را آپلود کنید. با وجود فایل محلی، Google Fonts به‌طور کامل غیرفعال می‌شود."}),
        ("تماس و شبکه‌های اجتماعی", {"fields": ("mobile", "phone", "whatsapp", "email", "working_hours", "telegram_url", "instagram_url", "primary_cta_text", "mobile_sticky_call_enabled")}),
        ("نشانی فعلی", {"fields": ("north_office", "west_office"), "description": "مدل مستقل شعب طبق تصمیم فعلی ایجاد نشده است."}),
        ("سئوی عمومی", {"fields": ("default_meta_title", "default_meta_description", "title_template", "default_robots_index", "default_robots_follow", "breadcrumb_enabled", "google_site_verification", "google_analytics_id", "google_tag_manager_id")}),
        ("حقوقی", {"fields": ("legal_name", "registration_number", "national_id", "tourism_license_number", "license_issuer", "visa_disclaimer")}),
        ("فرم‌ها", {"fields": ("privacy_consent_text", "lead_success_message", "lead_error_message", "lead_notification_email", "captcha_enabled")}),
        ("صفحه اصلی", {"fields": ("hero_eyebrow", "hero_title", "hero_description", "hero_image", "home_services_enabled", "home_testimonials_enabled", "home_faq_enabled", "home_trust_enabled")}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    list_display = ("title", "page_type", "is_published", "sort_order", "updated_at")
    list_filter = ("page_type", "is_published")
    search_fields = ("title", "slug", "meta_title")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "service", "status", "source", "created_at")
    list_filter = ("status", "source", "consent", "created_at")
    search_fields = ("full_name", "phone", "service")
    readonly_fields = ("created_at", "updated_at", "consent", "landing_path", "source")


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "page_path", "is_active", "sort_order")
    list_filter = ("is_active",)
    search_fields = ("question", "answer", "page_path")
    list_editable = ("is_active", "sort_order")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "rating", "is_active", "sort_order")
    list_filter = ("is_active", "rating")
    list_editable = ("is_active", "sort_order")


@admin.register(TrustItem)
class TrustItemAdmin(admin.ModelAdmin):
    list_display = ("title", "item_type", "is_active", "sort_order")
    list_filter = ("item_type", "is_active")
    list_editable = ("is_active", "sort_order")
