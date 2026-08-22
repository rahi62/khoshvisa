from django.contrib import admin
from .models import LandingPage, Lead, SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("brand_name", "mobile", "phone", "updated_at")


@admin.register(LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    list_display = ("title", "page_type", "is_published", "sort_order", "updated_at")
    list_filter = ("page_type", "is_published")
    search_fields = ("title", "slug", "meta_title")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "service", "is_contacted", "created_at")
    list_filter = ("is_contacted", "created_at")
    search_fields = ("full_name", "phone", "service")
    readonly_fields = ("created_at", "updated_at")

