from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("content", "0002_faq_testimonial_trustitem_lead_admin_notes_and_more")]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="font_family_name",
            field=models.CharField(blank=True, default="KhoshVisaFont", max_length=120),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="font_file",
            field=models.FileField(blank=True, help_text="فرمت پیشنهادی WOFF2؛ حداکثر حجم پیشنهادی ۳۰۰ کیلوبایت", upload_to="fonts/"),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="font_weight",
            field=models.CharField(blank=True, default="100 900", max_length=40),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="google_font_url",
            field=models.URLField(blank=True, help_text="فقط وقتی فونت محلی آپلود نشده باشد بارگذاری می‌شود"),
        ),
    ]
