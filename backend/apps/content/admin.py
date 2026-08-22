from django.contrib import admin
from .models import Lead,Office,SiteSettings,Tour,VisaService

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display=("brand_name","mobile","phone","updated_at")
    def has_add_permission(self,request): return not SiteSettings.objects.exists()

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin): list_display=("title","address","is_active","order");list_editable=("is_active","order")
@admin.register(VisaService)
class VisaServiceAdmin(admin.ModelAdmin): list_display=("title","slug","is_published","order","updated_at");list_editable=("is_published","order");prepopulated_fields={"slug":("title",)};search_fields=("title","summary","content")
@admin.register(Tour)
class TourAdmin(admin.ModelAdmin): list_display=("title","destination","price_label","is_featured","is_published","order");list_editable=("is_featured","is_published","order");prepopulated_fields={"slug":("title",)};search_fields=("title","destination","summary")
@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin): list_display=("full_name","phone","service","is_contacted","created_at");list_filter=("service","is_contacted");list_editable=("is_contacted",);search_fields=("full_name","phone")
