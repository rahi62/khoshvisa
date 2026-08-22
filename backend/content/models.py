from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimestampedModel):
    brand_name = models.CharField(max_length=120, default="خوش ویزا")
    mobile = models.CharField(max_length=20, default="09124175574")
    phone = models.CharField(max_length=20, default="02146010788")
    north_office = models.CharField(max_length=255, default="تهران، قبل از پارک‌وی، روبه‌روی هتل استقلال")
    west_office = models.CharField(max_length=255, default="تهران، جنت‌آباد مرکزی، بلوار بعثت")

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def __str__(self):
        return self.brand_name


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
    full_name = models.CharField(max_length=120)
    phone = models.CharField(max_length=20)
    service = models.CharField(max_length=180, blank=True)
    message = models.TextField(blank=True)
    is_contacted = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "درخواست مشاوره"
        verbose_name_plural = "درخواست‌های مشاوره"

    def __str__(self):
        return f"{self.full_name} - {self.phone}"

