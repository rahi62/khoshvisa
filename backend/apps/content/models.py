from django.db import models

class TimeStampedModel(models.Model):
    created_at=models.DateTimeField(auto_now_add=True);updated_at=models.DateTimeField(auto_now=True)
    class Meta: abstract=True

class SeoModel(models.Model):
    meta_title=models.CharField(max_length=70,blank=True);meta_description=models.CharField(max_length=170,blank=True)
    class Meta: abstract=True

class SiteSettings(TimeStampedModel):
    brand_name=models.CharField(max_length=80,default="خوش ویزا")
    mobile=models.CharField(max_length=20,default="09124175574")
    phone=models.CharField(max_length=20,default="02146010788")
    tagline=models.CharField(max_length=160,default="همراه مطمئن سفرهای شما")
    def __str__(self): return self.brand_name
    class Meta: verbose_name="تنظیمات سایت";verbose_name_plural="تنظیمات سایت"

class Office(TimeStampedModel):
    title=models.CharField(max_length=100);address=models.CharField(max_length=300);phone=models.CharField(max_length=20,blank=True);is_active=models.BooleanField(default=True);order=models.PositiveSmallIntegerField(default=0)
    def __str__(self): return self.title
    class Meta: ordering=["order","id"];verbose_name="دفتر فروش";verbose_name_plural="دفاتر فروش"

class VisaService(SeoModel,TimeStampedModel):
    title=models.CharField(max_length=120);slug=models.SlugField(unique=True);eyebrow=models.CharField(max_length=120,blank=True);summary=models.TextField();content=models.TextField();facts=models.JSONField(default=list,blank=True);faq=models.JSONField(default=list,blank=True);is_published=models.BooleanField(default=True);order=models.PositiveSmallIntegerField(default=0)
    def __str__(self): return self.title
    class Meta: ordering=["order","title"];verbose_name="خدمت ویزا";verbose_name_plural="خدمات ویزا"

class Tour(SeoModel,TimeStampedModel):
    title=models.CharField(max_length=120);slug=models.SlugField(unique=True);destination=models.CharField(max_length=120);summary=models.TextField();content=models.TextField();duration=models.CharField(max_length=80,blank=True);price_label=models.CharField(max_length=100,blank=True);departures=models.JSONField(default=list,blank=True);is_featured=models.BooleanField(default=False);is_published=models.BooleanField(default=True);order=models.PositiveSmallIntegerField(default=0)
    def __str__(self): return self.title
    class Meta: ordering=["order","title"];verbose_name="تور";verbose_name_plural="تورها"

class Lead(TimeStampedModel):
    class Service(models.TextChoices): VISA="visa","ویزا";TOUR="tour","تور";OTHER="other","سایر"
    full_name=models.CharField(max_length=120);phone=models.CharField(max_length=20);service=models.CharField(max_length=20,choices=Service.choices);message=models.TextField(blank=True);source_path=models.CharField(max_length=255,blank=True);is_contacted=models.BooleanField(default=False);notes=models.TextField(blank=True)
    def __str__(self): return f"{self.full_name} - {self.phone}"
    class Meta: ordering=["-created_at"];verbose_name="درخواست مشاوره";verbose_name_plural="درخواست‌های مشاوره"
