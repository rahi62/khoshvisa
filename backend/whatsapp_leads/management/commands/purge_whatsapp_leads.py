from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from whatsapp_leads.models import WhatsAppContact


class Command(BaseCommand):
    help = "Review or purge CLOSED/INVALID WhatsApp leads past retention; dry-run by default."

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", help="Actually delete eligible data")
        parser.add_argument("--older-than", type=int, default=None, help="Retention in days (minimum 30)")

    def handle(self, *args, **opts):
        days = opts["older_than"] or settings.WHATSAPP_RETENTION_DAYS
        if days < 30:
            raise CommandError("Retention period must be at least 30 days.")
        cutoff = timezone.now() - timedelta(days=days)
        candidates = WhatsAppContact.objects.filter(
            last_inbound_at__lt=cutoff,
            lead__source__in=("whatsapp", "whatsapp-manual"),
            lead__status__in=("closed", "invalid"),
        )
        count = candidates.count()
        if not opts["apply"]:
            self.stdout.write(f"DRY RUN: {count} eligible conversations older than {days} days; no deletion.")
            return
        with transaction.atomic():
            ids = list(candidates.values_list("lead_id", flat=True))
            from content.models import Lead
            deleted = Lead.objects.filter(id__in=ids, source__in=("whatsapp", "whatsapp-manual")).delete()
        self.stdout.write(self.style.SUCCESS(f"Deleted {len(ids)} eligible lead records and related events."))
