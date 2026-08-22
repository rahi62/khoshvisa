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
            field=models.FileField(blank=True, help_text="ÙØ±ÙØª Ù¾ÛØ´ÙÙØ§Ø¯Û WOFF2Ø Ø­Ø¯Ø§Ú©Ø«Ø± Ø­Ø¬Ù Ù¾ÛØ´ÙÙØ§Ø¯Û Û³Û°Û° Ú©ÛÙÙØ¨Ø§ÛØª", upload_to="fonts/"),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="font_weight",
            field=models.CharField(blank=True, default="100 900", max_length=40),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="google_font_url",
            field=models.URLField(blank=True, help_text="ÙÙØ· ÙÙØªÛ ÙÙÙØª ÙØ­ÙÛ Ø¢Ù¾ÙÙØ¯ ÙØ´Ø¯Ù Ø¨Ø§Ø´Ø¯ Ø¨Ø§Ø±Ú¯Ø°Ø§Ø±Û ÙÛâØ´ÙØ¯"),
        ),
    ]
