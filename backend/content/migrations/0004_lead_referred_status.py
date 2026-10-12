from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0003_sitesettings_fonts"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lead",
            name="status",
            field=models.CharField(
                choices=[
                    ("new", "جدید"),
                    ("contacted", "تماس گرفته شد"),
                    ("follow_up", "نیازمند پیگیری"),
                    ("qualified", "واجد شرایط"),
                    ("referred", "ارجاع ثبت‌شده با رضایت"),
                    ("converted", "تبدیل به مشتری"),
                    ("closed", "بسته‌شده"),
                    ("invalid", "نامعتبر"),
                ],
                default="new",
                max_length=20,
            ),
        ),
    ]
