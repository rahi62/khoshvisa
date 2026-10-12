from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0004_lead_referred_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="lead",
            name="follow_up_at",
            field=models.DateTimeField(
                blank=True, db_index=True, null=True,
                verbose_name="زمان پیگیری بعدی",
            ),
        ),
    ]
