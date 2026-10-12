import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("content", "0004_lead_referred_status"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="WhatsAppContact",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("wa_id", models.CharField(max_length=24, unique=True, verbose_name="شناسه حساب واتساپ")),
                ("tracking_reference", models.CharField(blank=True, db_index=True, max_length=32, verbose_name="کد پیگیری سایت")),
                ("destination", models.CharField(blank=True, max_length=80, verbose_name="مقصد")),
                ("purpose", models.CharField(blank=True, max_length=80, verbose_name="هدف سفر")),
                ("travel_window", models.CharField(blank=True, max_length=80, verbose_name="زمان سفر")),
                ("first_inbound_at", models.DateTimeField(default=django.utils.timezone.now, verbose_name="اولین پیام")),
                ("last_inbound_at", models.DateTimeField(default=django.utils.timezone.now, verbose_name="آخرین پیام")),
                ("message_count", models.PositiveIntegerField(default=0, verbose_name="پیام‌های دریافت‌شده")),
                ("partner_share_consent", models.BooleanField(default=False, verbose_name="رضایت جداگانه اشتراک با ارائه‌دهنده مستقل")),
                ("partner_share_consent_evidence", models.TextField(blank=True, verbose_name="ثبت مستند رضایت")),
                ("partner_share_consent_at", models.DateTimeField(blank=True, null=True, verbose_name="تاریخ رضایت انتقال")),
                ("forwarded_partner", models.CharField(blank=True, max_length=160, verbose_name="شناسه/نام ارائه‌دهنده مستقل")),
                ("forwarded_at", models.DateTimeField(blank=True, null=True, verbose_name="تاریخ اشتراک اطلاعات")),
                ("lead", models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="whatsapp_contact", to="content.lead")),
            ],
            options={
                "verbose_name": "مکالمه واتساپ",
                "verbose_name_plural": "مکالمات واتساپ",
                "ordering": ("-last_inbound_at",),
            },
        ),
        migrations.CreateModel(
            name="WhatsAppInboundEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("message_id", models.CharField(max_length=190, unique=True)),
                ("sender_wa_id", models.CharField(max_length=24)),
                ("kind", models.CharField(blank=True, max_length=32)),
                ("received_at", models.DateTimeField(auto_now_add=True)),
                ("contact", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="events", to="whatsapp_leads.whatsappcontact")),
            ],
            options={
                "verbose_name": "رخداد پیام واتساپ",
                "verbose_name_plural": "رخدادهای پیام واتساپ",
                "ordering": ("-received_at",),
            },
        ),
        migrations.CreateModel(
            name="LeadStatusHistory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("from_status", models.CharField(blank=True, max_length=30)),
                ("to_status", models.CharField(max_length=30)),
                ("changed_at", models.DateTimeField(auto_now_add=True)),
                ("changed_by", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ("lead", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="status_history", to="content.lead")),
            ],
            options={"verbose_name": "تغییر وضعیت درخواست", "verbose_name_plural": "تاریخچه وضعیت درخواست", "ordering": ("-changed_at",)},
        ),
    ]
