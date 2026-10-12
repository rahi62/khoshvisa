from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from whatsapp_leads.models import WhatsAppContact


class Command(BaseCommand):
    help = "After verifying requester's identity, remove one WhatsApp record and related events. Dry-run by default."

    def add_arguments(self, parser):
        parser.add_argument("--wa-id", required=True, help="WhatsApp identifier, digits only, no +")
        parser.add_argument("--apply", action="store_true")

    def handle(self, *args, **opts):
        wa_id = opts["wa_id"]
        try:
            contact = WhatsAppContact.objects.select_related("lead").get(wa_id=wa_id)
        except WhatsAppContact.DoesNotExist:
            raise CommandError("No matching WhatsApp record.")
        if not opts["apply"]:
            self.stdout.write("DRY RUN: matching WhatsApp record exists; confirm verified identity before --apply.")
            return
        from content.models import Lead
        with transaction.atomic():
            if contact.lead_id and contact.lead.source == "whatsapp":
                Lead.objects.filter(id=contact.lead_id, source="whatsapp").delete()
            else:
                contact.delete()
        self.stdout.write(self.style.SUCCESS("Requested WhatsApp record and related events erased."))
