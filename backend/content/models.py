from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimestampedModel):
    brand_name = models.CharField(max_length=120, default="Ø®ÙØ´ ÙÛØ²Ø§")
    brand_name_en = models.CharField(max_length=120, default="Khosh Visa", blank=True)
    tagline = models.CharField(max_length=180, default="ÙØ´Ø§ÙØ±Ù ØªØ®ØµØµÛ ØªÙØ± Ù ÙÛØ²Ø§", blank=True)
    brand_description = models.TextField(default="Ø®Ø¯ÙØ§Øª Ø¨Ø±Ø±Ø³Û Ù¾Ø±ÙÙØ¯Ù ÙÛØ²Ø§ Ù Ø±Ø²Ø±Ù ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û", blank=True)
    logo = models.URLField(blank=True)
    logo_dark = models.URLField(blank=True)
    favicon = models.URLField(blank=True)
    primary_color = models.CharField(max_length=20, default="#075f5b")
    accent_color = models.CharField(max_length=20, default="#f2b84b")
    font_family_name = models.CharField(max_length=120, default="KhoshVisaFont", blank=True)
    font_file = models.FileField(upload_to="fonts/", blank=True, help_text="ÙØ±ÙØª Ù¾ÛØ´ÙÙØ§Ø¯Û WOFF2Ø Ø­Ø¯Ø§Ú©Ø«Ø± Ø­Ø¬Ù Ù¾ÛØ´ÙÙØ§Ø¯Û Û³Û°Û° Ú©ÛÙÙØ¨Ø§ÛØª")
    font_weight = models.CharField(max_length=40, default="100 900", blank=True)
    google_font_url = models.URLField(blank=True, help_text="ÙÙØ· ÙÙØªÛ ÙÙÙØª ÙØ­ÙÛ Ø¢Ù¾ÙÙØ¯ ÙØ´Ø¯Ù Ø¨Ø§Ø´Ø¯ Ø¨Ø§Ø±Ú¯Ø°Ø§Ø±Û ÙÛâØ´ÙØ¯")
    default_og_image = models.URLField(blank=True)
    site_domain = models.CharField(max_length=255, default="khoshvisa.ir")
    mobile = models.CharField(max_length=20, default="09124175574")
    phone = models.CharField(max_length=20, default="02146010788")
    whatsapp = models.CharField(max_length=20, blank=True)
    telegram_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    working_hours = models.CharField(max_length=180, blank=True)
    primary_cta_text = models.CharField(max_length=80, default="Ø¯Ø±Ø®ÙØ§Ø³Øª ÙØ´Ø§ÙØ±Ù")
    mobile_sticky_call_enabled = models.BooleanField(default=True)
    north_office = models.CharField(max_length=255, default="ØªÙØ±Ø§ÙØ ÙØ¨Ù Ø§Ø² Ù¾Ø§Ø±Ú©âÙÛØ Ø±ÙØ¨ÙâØ±ÙÛ ÙØªÙ Ø§Ø³ØªÙÙØ§Ù")
    west_office = models.CharField(max_length=255, default="ØªÙØ±Ø§ÙØ Ø¬ÙØªâØ¢Ø¨Ø§Ø¯ ÙØ±Ú©Ø²ÛØ Ø¨ÙÙØ§Ø± Ø¨Ø¹Ø«Øª")
    default_meta_title = models.CharField(max_length=180, default="Ø®ÙØ´ ÙÛØ²Ø§ | Ø®Ø¯ÙØ§Øª ÙÛØ²Ø§ Ù ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û")
    default_meta_description = models.CharField(max_length=320, default="Ø®Ø¯ÙØ§Øª Ø¨Ø±Ø±Ø³Û Ù ØªÚ©ÙÛÙ Ù¾Ø±ÙÙØ¯Ù ÙÛØ²Ø§ Ù Ø±Ø²Ø±Ù ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û Ø¯Ø± Ø®ÙØ´ ÙÛØ²Ø§")
    title_template = models.CharField(max_length=120, default="{page_title} | Ø®ÙØ´ ÙÛØ²Ø§")
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
    visa_disclaimer = models.TextField(default="ØªØµÙÛÙ ÙÙØ§ÛÛ ØµØ¯ÙØ± ÛØ§ Ø±Ø¯ ÙÛØ²Ø§ ØµØ±ÙØ§Ù Ø¨Ø± Ø¹ÙØ¯Ù Ø³ÙØ§Ø±Øª ÛØ§ Ú©ÙØ³ÙÙÚ¯Ø±Û ÙØ±Ø¨ÙØ·Ù Ø§Ø³Øª.")
    privacy_consent_text = models.CharField(max_length=320, default="Ø¨Ø§ Ø«Ø¨Øª Ø¯Ø±Ø®ÙØ§Ø³ØªØ Ø¨Ø§ Ù¾Ø±Ø¯Ø§Ø²Ø´ Ø§Ø·ÙØ§Ø¹Ø§Øª Ø¨Ø±Ø§Û ØªÙØ§Ø³ Ù ÙØ´Ø§ÙØ±Ù ÙÙØ§ÙÙØª ÙÛâÚ©ÙÙ.")
    lead_success_message = models.CharField(max_length=255, default="Ø¯Ø±Ø®ÙØ§Ø³Øª Ø´ÙØ§ Ø«Ø¨Øª Ø´Ø¯Ø Ø¨Ø§ Ø´ÙØ§ ØªÙØ§Ø³ ÙÛâÚ¯ÛØ±ÛÙ.")
    lead_error_message = models.CharField(max_length=255, default="Ø§Ø±Ø³Ø§Ù Ø§ÙØ¬Ø§Ù ÙØ´Ø¯Ø Ø´ÙØ§Ø±Ù Ø±Ø§ Ø¨Ø±Ø±Ø³Û Ú©ÙÛØ¯ ÛØ§ ÙØ³ØªÙÛÙ ØªÙØ§Ø³ Ø¨Ú¯ÛØ±ÛØ¯.")
    lead_notification_email = models.EmailField(blank=True)
    captcha_enabled = models.BooleanField(default=False)
    hero_eyebrow = models.CharField(max_length=100, default="ÙØ´Ø§ÙØ±Ù ØªØ®ØµØµÛ Ø³ÙØ±")
    hero_title = models.CharField(max_length=255, default="Ø¨Ø±Ø§Û ÙÛØ²Ø§ Ù ØªÙØ±Ø Ø¨Ø§ Ø§Ø·ÙØ§Ø¹Ø§Øª Ø´ÙØ§Ù ØªØµÙÛÙ Ø¨Ú¯ÛØ±ÛØ¯")
    hero_description = models.TextField(default="Ù¾Ø±ÙÙØ¯Ù ÙÛØ²Ø§Û Ø´ÙØ§ Ø±Ø§ Ø§Ø±Ø²ÛØ§Ø¨Û ÙÛâÚ©ÙÛÙ Ù Ø¨Ø±Ø§Û Ø³ÙØ± Ø®Ø§Ø±Ø¬ÛØ Ù¾Ú©ÛØ¬Û ÙØªÙØ§Ø³Ø¨ Ø¨Ø§ Ø¨ÙØ¯Ø¬Ù Ù Ø§ÙÙÙÛØªâÙØ§ÛØªØ§Ù Ù¾ÛØ´ÙÙØ§Ø¯ ÙÛâØ¯ÙÛÙ.")
    hero_image = models.URLField(blank=True)
    home_services_enabled = models.BooleanField(default=True)
    home_testimonials_enabled = models.BooleanField(default=True)
    home_faq_enabled = models.BooleanField(default=True)
    home_trust_enabled = models.BooleanField(default=True)

    class Meta:
        verbose_name = "ØªÙØ¸ÛÙØ§Øª Ø³Ø§ÛØª"
        verbose_name_plural = "ØªÙØ¸ÛÙØ§Øª Ø³Ø§ÛØª"

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
    page_path = models.CharField(max_length=255, blank=True, help_text="Ø®Ø§ÙÛ Ø¨Ø±Ø§Û ÙÙØ§ÛØ´ Ø¹ÙÙÙÛØ ÙØ§ÙÙØ¯ /visa/france")
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Ø³Ø¤Ø§Ù ÙØªØ¯Ø§ÙÙ"
        verbose_name_plural = "Ø³Ø¤Ø§ÙØ§Øª ÙØªØ¯Ø§ÙÙ"

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
        verbose_name = "ÙØ¸Ø± ÙØ´ØªØ±Û"
        verbose_name_plural = "ÙØ¸Ø±Ø§Øª ÙØ´ØªØ±ÛØ§Ù"

    def __str__(self):
        return self.customer_name


class TrustItem(TimestampedModel):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)
    link = models.URLField(blank=True)
    item_type = models.CharField(max_length=30, choices=[("license", "ÙØ¬ÙØ²"), ("badge", "ÙØ´Ø§Ù Ø§Ø¹ØªÙØ§Ø¯"), ("stat", "Ø¢ÙØ§Ø±")], default="badge")
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Ø¢ÛØªÙ Ø§Ø¹ØªÙØ§Ø¯Ø³Ø§Ø²Û"
        verbose_name_plural = "Ø§Ø¹ØªÙØ§Ø¯Ø³Ø§Ø²Û Ù ÙØ¬ÙØ²ÙØ§"

    def __str__(self):
        return self.title


class LandingPage(TimestampedModel):
    VISA = "visa"
    TOUR = "tour"
    PAGE_TYPES = [(VISA, "ÙÛØ²Ø§"), (TOUR, "ØªÙØ±")]

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
        verbose_name = "ÙÙØ¯ÛÙÚ¯"
        verbose_name_plural = "ÙÙØ¯ÛÙÚ¯âÙØ§"

    def __str__(self):
        return self.title


class Lead(TimestampedModel):
    STATUS_CHOICES = [("new", "Ø¬Ø¯ÛØ¯"), ("contacted", "ØªÙØ§Ø³ Ú¯Ø±ÙØªÙ Ø´Ø¯"), ("follow_up", "ÙÛØ§Ø²ÙÙØ¯ Ù¾ÛÚ¯ÛØ±Û"), ("qualified", "ÙØ§Ø¬Ø¯ Ø´Ø±Ø§ÛØ·"), ("converted", "ØªØ¨Ø¯ÛÙ Ø¨Ù ÙØ´ØªØ±Û"), ("closed", "Ø¨Ø³ØªÙâØ´Ø¯Ù"), ("invalid", "ÙØ§ÙØ¹ØªØ¨Ø±")]
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

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Ø¯Ø±Ø®ÙØ§Ø³Øª ÙØ´Ø§ÙØ±Ù"
        verbose_name_plural = "Ø¯Ø±Ø®ÙØ§Ø³ØªâÙØ§Û ÙØ´Ø§ÙØ±Ù"

    def __str__(self):
        return f"{self.full_name} - {self.phone}"
