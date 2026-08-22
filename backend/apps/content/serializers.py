from rest_framework import serializers
from .models import Lead,Office,SiteSettings,Tour,VisaService
class OfficeSerializer(serializers.ModelSerializer):
    class Meta: model=Office;fields=("id","title","address","phone")
class SettingsSerializer(serializers.ModelSerializer):
    offices=serializers.SerializerMethodField()
    class Meta: model=SiteSettings;fields=("brand_name","tagline","mobile","phone","offices")
    def get_offices(self,obj): return OfficeSerializer(Office.objects.filter(is_active=True),many=True).data
class VisaServiceSerializer(serializers.ModelSerializer):
    class Meta: model=VisaService;exclude=("is_published",)
class TourSerializer(serializers.ModelSerializer):
    class Meta: model=Tour;exclude=("is_published",)
class LeadSerializer(serializers.ModelSerializer):
    class Meta: model=Lead;fields=("id","full_name","phone","service","message","source_path","created_at");read_only_fields=("id","created_at")
    def validate_phone(self,value):
        clean="".join(c for c in value if c.isdigit())
        if len(clean)<10: raise serializers.ValidationError("شماره تماس معتبر نیست.")
        return clean
