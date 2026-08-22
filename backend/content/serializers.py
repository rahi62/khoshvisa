from rest_framework import serializers
from .models import FAQ, LandingPage, Lead, SiteSettings, Testimonial, TrustItem


class SiteSettingsSerializer(serializers.ModelSerializer):
    font_file = serializers.SerializerMethodField()

    def get_font_file(self, obj):
        if not obj.font_file:
            return ""
        request = self.context.get("request")
        path = "/api/v1/site-font/"
        return request.build_absolute_uri(path) if request else path

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
        fields = ("id", "full_name", "phone", "service", "message", "source", "landing_path", "consent", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_phone(self, value):
        normalized = value.replace(" ", "").replace("-", "")
        if not normalized.startswith("09") or len(normalized) != 11 or not normalized.isdigit():
            raise serializers.ValidationError("Ø´ÙØ§Ø±Ù ÙÙØ¨Ø§ÛÙ ÙØ¹ØªØ¨Ø± ÙØ§Ø±Ø¯ Ú©ÙÛØ¯.")
        return normalized


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ("id", "question", "answer", "page_path", "sort_order")


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ("id", "customer_name", "customer_role", "text", "avatar", "rating", "sort_order")


class TrustItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrustItem
        fields = ("id", "title", "description", "image", "link", "item_type", "sort_order")
