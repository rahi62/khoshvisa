from rest_framework import serializers
from .models import LandingPage, Lead, SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class LandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingPage
        fields = "__all__"


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ("id", "full_name", "phone", "service", "message", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_phone(self, value):
        normalized = value.replace(" ", "").replace("-", "")
        if not normalized.startswith("09") or len(normalized) != 11 or not normalized.isdigit():
            raise serializers.ValidationError("شماره موبایل معتبر وارد کنید.")
        return normalized

