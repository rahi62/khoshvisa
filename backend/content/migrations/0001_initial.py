from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="LandingPage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("page_type", models.CharField(choices=[("visa", "ویزا"), ("tour", "تور")], max_length=10)),
                ("title", models.CharField(max_length=180)),
                ("slug", models.SlugField(allow_unicode=True, max_length=180, unique=True)),
                ("excerpt", models.TextField()),
                ("body", models.TextField(blank=True)),
                ("meta_title", models.CharField(max_length=180)),
                ("meta_description", models.CharField(max_length=320)),
                ("is_published", models.BooleanField(default=True)),
                ("sort_order", models.PositiveIntegerField(default=0)),
            ],
            options={"verbose_name": "لندینگ", "verbose_name_plural": "لندینگ‌ها", "ordering": ["sort_order", "title"]},
        ),
        migrations.CreateModel(
            name="Lead",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("full_name", models.CharField(max_length=120)),
                ("phone", models.CharField(max_length=20)),
                ("service", models.CharField(blank=True, max_length=180)),
                ("message", models.TextField(blank=True)),
                ("is_contacted", models.BooleanField(default=False)),
            ],
            options={"verbose_name": "درخواست مشاوره", "verbose_name_plural": "درخواست‌های مشاوره", "ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("brand_name", models.CharField(default="خوش ویزا", max_length=120)),
                ("mobile", models.CharField(default="09124175574", max_length=20)),
                ("phone", models.CharField(default="02146010788", max_length=20)),
                ("north_office", models.CharField(default="تهران، قبل از پارک‌وی، روبه‌روی هتل استقلال", max_length=255)),
                ("west_office", models.CharField(default="تهران، جنت‌آباد مرکزی، بلوار بعثت", max_length=255)),
            ],
            options={"verbose_name": "تنظیمات سایت", "verbose_name_plural": "تنظیمات سایت"},
        ),
    ]

