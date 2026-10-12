from django.db import models
from django.core.exceptions import ValidationError


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimestampedModel):
    brand_name = models.CharField(max_length=120, default="خوش ویزا")
    brand_name_en = models.CharField(max_length=120, default="Khosh Visa", blank=True)
    tagline = models.CharField(max_length=180, default="مشاوره تخصصی تور و ویزا", blank=True)
    brand_description = models.TextField(default="خدمات بررسی پرونده ویزا و رزرو تورهای خارجی", blank=True)
    logo = models.URLField(blank=True)
    logo_dark = models.URLField(blank=True)
    favicon = models.URLField(blank=True)
    primary_color = models.CharField(max_length=20, default="#075f5b")
    accent_color = models.CharField(max_length=20, default="#f2b84b")
    font_family_name = models.CharField(max_length=120, default="KhoshVisaFont", blank=True)
    font_file = models.FileField(upload_to="fonts/", blank=True, help_text="فرمت پیشنهادی WOFF2؛ حداکثر حجم پیشنهادی ۳۰۰ کیلوبایت")
    font_weight = models.CharField(max_length=40, default="100 900", blank=True)
    google_font_url = models.URLField(blank=True, help_text="فقط وقتی فونت محلی آپلود نشده باشد بارگذاری می‌شود")
    default_og_image = models.URLField(blank=True)
    site_domain = models.CharField(max_length=255, default="khoshvisa.ir")
    mobile = models.CharField(max_length=20, default="09124175574")
    phone = models.CharField(max_length=20, default="02146010788")
    whatsapp = models.CharField(max_length=20, blank=True)
    telegram_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    working_hours = models.CharField(max_length=180, blank=True)
    primary_cta_text = models.CharField(max_length=80, default="درخواست مشاوره")
    mobile_sticky_call_enabled = models.BooleanField(default=True)
    north_office = models.CharField(max_length=255, default="تهران، قبل از پارک‌وی، روبه‌روی هتل استقلال")
    west_office = models.CharField(max_length=255, default="تهران، جنت‌آباد مرکزی، بلوار بعثت")
    default_meta_title = models.CharField(max_length=180, default="خوش ویزا | خدمات ویزا و تورهای خارجی")
    default_meta_description = models.CharField(max_length=320, default="خدمات بررسی و تکمیل پرونده ویزا و رزرو تورهای خارجی در خوش ویزا")
    title_template = models.CharField(max_length=120, default="{page_title} | خوش ویزا")
    google_site_verification = models.CharField(max_length=255, blank=True)
    google_analytics_id = models.CharField(max_length=50, blank=True)
    google_tag_manager_id = models.CharField(max_length=50, blank=True)
    default_robots_index = models.BooleanField(default=True)
    default_robots_follow = models.BooleanField(default=True)
    breadcrumb_enabled = models.BooleanField(default=True)
    legal_name = models.CharField(max_length=180, blank=True)
    registration_number = models.CharField(max_length=80, blank=True)
    national_id = models.CharField(max_length=80, blank=True)
    tourism_license_number = models.CharField(max_length=100, blank=True)
    license_issuer = models.CharField(max_length=180, blank=True)
    visa_disclaimer = models.TextField(default="تصمیم نهایی صدور یا رد ویزا صرفاً بر عهده سفارت یا کنسولگری مربوطه است.")
    privacy_consent_text = models.CharField(max_length=320, default="با ثبت درخواست، با پردازش اطلاعات برای تماس و مشاوره موافقت می‌کنم.")
    lead_success_message = models.CharField(max_length=255, default="درخواست شما ثبت شد؛ با شما تماس می‌گیریم.")
    lead_error_message = models.CharField(max_length=255, default="ارسال انجام نشد؛ شماره را بررسی کنید یا مستقیم تماس بگیرید.")
    lead_notification_email = models.EmailField(blank=True)
    captcha_enabled = models.BooleanField(default=False)
    hero_eyebrow = models.CharField(max_length=100, default="مشاوره تخصصی سفر")
    hero_title = models.CharField(max_length=255, default="برای ویزا و تور، با اطلاعات شفاف تصمیم بگیرید")
    hero_description = models.TextField(default="پرونده ویزای شما را ارزیابی می‌کنیم و برای سفر خارجی، پکیجی متناسب با بودجه و اولویت‌هایتان پیشنهاد می‌دهیم.")
    hero_image = models.URLField(blank=True)
    home_services_enabled = models.BooleanField(default=True)
    home_testimonials_enabled = models.BooleanField(default=True)
    home_faq_enabled = models.BooleanField(default=True)
    home_trust_enabled = models.BooleanField(default=True)

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def __str__(self):
        return self.brand_name

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            self.pk = SiteSettings.objects.first().pk
        super().save(*args, **kwargs)

    @property
    def active_font_source(self):
        return "local" if self.font_file else ("google" if self.google_font_url else "system")


class FAQ(TimestampedModel):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    page_path = models.CharField(max_length=255, blank=True, help_text="خالی برای نمایش عمومی؛ مانند /visa/france")
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "سؤال متداول"
        verbose_name_plural = "سؤالات متداول"

    def __str__(self):
        return self.question


class Testimonial(TimestampedModel):
    customer_name = models.CharField(max_length=120)
    customer_role = models.CharField(max_length=120, blank=True)
    text = models.TextField()
    avatar = models.URLField(blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "نظر مشتری"
        verbose_name_plural = "نظرات مشتریان"

    def __str__(self):
        return self.customer_name


class TrustItem(TimestampedModel):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)
    link = models.URLField(blank=True)
    item_type = models.CharField(max_length=30, choices=[("license", "مجوز"), ("badge", "نشان اعتماد"), ("stat", "آمار")], default="badge")
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "آیتم اعتمادسازی"
        verbose_name_plural = "اعتمادسازی و مجوزها"

    def __str__(self):
        return self.title


class LandingPage(TimestampedModel):
    VISA = "visa"
    TOUR = "tour"
    PAGE_TYPES = [(VISA, "ویزا"), (TOUR, "تور")]

    page_type = models.CharField(max_length=10, choices=PAGE_TYPES)
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=180, unique=True, allow_unicode=True)
    excerpt = models.TextField()
    body = models.TextField(blank=True)
    meta_title = models.CharField(max_length=180)
    meta_description = models.CharField(max_length=320)
    is_published = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "لندینگ"
        verbose_name_plural = "لندینگ‌ها"

    def __str__(self):
        return self.title


class Lead(TimestampedModel):
    STATUS_CHOICES = [("new", "جدید"), ("contacted", "تماس گرفته شد"), ("follow_up", "نیازمند پیگیری"), ("qualified", "واجد شرایط"), ("referred", "ارجاع ثبت‌شده با رضایت"), ("converted", "تبدیل به مشتری"), ("closed", "بسته‌شده"), ("invalid", "نامعتبر")]
    full_name = models.CharField(max_length=120)
    phone = models.CharField(max_length=20)
    service = models.CharField(max_length=180, blank=True)
    message = models.TextField(blank=True)
    is_contacted = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    source = models.CharField(max_length=120, default="website", blank=True)
    landing_path = models.CharField(max_length=255, blank=True)
    consent = models.BooleanField(default=True)
    admin_notes = models.TextField(blank=True)
    follow_up_at = models.DateTimeField("زمان پیگیری بعدی", null=True, blank=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "درخواست مشاوره"
        verbose_name_plural = "درخواست‌های مشاوره"

    def clean(self):
        super().clean()
        if self.source == "whatsapp" and self.status == "follow_up" and not self.follow_up_at:
            raise ValidationError({"follow_up_at": "برای وضعیت نیازمند پیگیری، تاریخ پیگیری را وارد کنید."})
        if self.status == "referred" and self.source == "whatsapp":
            from whatsapp_leads.models import WhatsAppContact
            contact = WhatsAppContact.objects.filter(lead_id=self.pk).first() if self.pk else None
            if not contact or not contact.partner_share_consent or not contact.forwarded_at or not contact.forwarded_partner:
                raise ValidationError({"status": "قبل از ثبت ارجاع، رضایت مستند و تاریخ/گیرنده انتقال باید ثبت شده باشد."})

    def __str__(self):
        return f"{self.full_name} - {self.phone}"
