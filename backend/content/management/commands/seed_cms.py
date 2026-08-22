from django.core.management.base import BaseCommand

from digitalafarin_cms.apps.content.models import ContentEntry, ContentTypeDefinition
from digitalafarin_cms.apps.seo.models import SeoMeta
from digitalafarin_cms.apps.sites.models import Organization, Site

from content.models import LandingPage


class Command(BaseCommand):
    help = "Copy the initial Khosh Visa landing pages into DigitalAfarin CMS."

    def add_arguments(self, parser):
        parser.add_argument("--domain", default="localhost:3000")

    def handle(self, *args, **options):
        organization, _ = Organization.objects.update_or_create(
            slug="khoshvisa",
            defaults={"name": "خوش ویزا", "is_active": True},
        )
        site, _ = Site.objects.update_or_create(
            domain=options["domain"],
            defaults={
                "organization": organization,
                "name": "خوش ویزا",
                "default_language": "fa",
                "timezone": "Asia/Tehran",
                "is_active": True,
                "settings": {
                    "phone": "02146010788",
                    "mobile": "09124175574",
                },
            },
        )
        content_types = {}
        for slug, name in (("visa", "خدمات ویزا"), ("tour", "تورهای خارجی")):
            content_types[slug], _ = ContentTypeDefinition.objects.update_or_create(
                site=site,
                slug=slug,
                defaults={
                    "name": name,
                    "is_public": True,
                    "schema": {"body": {"type": "rich_text", "label": "محتوای اصلی"}},
                    "icon": "file-text",
                },
            )

        count = 0
        for landing in LandingPage.objects.filter(is_published=True):
            prefix = "visa" if landing.page_type == "visa" else "tours"
            entry, _ = ContentEntry.objects.update_or_create(
                site=site,
                path=f"/{prefix}/{landing.slug}",
                defaults={
                    "content_type": content_types[landing.page_type],
                    "title": landing.title,
                    "slug": landing.slug,
                    "excerpt": landing.excerpt,
                    "blocks": [{"type": "rich_text", "data": {"text": landing.body}}],
                    "custom_fields": {"legacy_landing_id": landing.pk},
                    "status": ContentEntry.Status.PUBLISHED,
                },
            )
            entry.publish()
            SeoMeta.objects.update_or_create(
                entry=entry,
                defaults={
                    "title": landing.meta_title,
                    "description": landing.meta_description,
                    "canonical_url": f"https://khoshvisa.ir/{prefix}/{landing.slug}",
                    "robots_index": True,
                    "robots_follow": True,
                    "og_title": landing.meta_title,
                    "og_description": landing.meta_description,
                },
            )
            count += 1
        self.stdout.write(self.style.SUCCESS(f"{count} لندینگ به CMS دیجیتال‌آفرین منتقل شد."))

