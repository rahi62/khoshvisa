from django.http import FileResponse, Http404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FAQ, LandingPage, Lead, SiteSettings, Testimonial, TrustItem
from .serializers import FAQSerializer, LandingPageSerializer, LeadSerializer, SiteSettingsSerializer, TestimonialSerializer, TrustItemSerializer


class SettingsView(APIView):
    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            settings = SiteSettings()
        return Response(SiteSettingsSerializer(settings, context={"request": request}).data)


class SiteFontView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings or not settings.font_file:
            raise Http404
        filename = settings.font_file.name.lower()
        content_type = "font/woff2" if filename.endswith(".woff2") else "font/woff"
        response = FileResponse(settings.font_file.open("rb"), content_type=content_type)
        response["Cache-Control"] = "public, max-age=31536000, immutable"
        response["Access-Control-Allow-Origin"] = "*"
        return response


class LandingListView(generics.ListAPIView):
    serializer_class = LandingPageSerializer

    def get_queryset(self):
        return LandingPage.objects.filter(is_published=True, page_type=self.kwargs["page_type"])


class LandingDetailView(generics.RetrieveAPIView):
    serializer_class = LandingPageSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return LandingPage.objects.filter(is_published=True, page_type=self.kwargs["page_type"])


class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class FAQListView(generics.ListAPIView):
    serializer_class = FAQSerializer

    def get_queryset(self):
        queryset = FAQ.objects.filter(is_active=True)
        path = self.request.query_params.get("path")
        return queryset.filter(page_path__in=["", path]) if path else queryset.filter(page_path="")


class TestimonialListView(generics.ListAPIView):
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.filter(is_active=True)


class TrustItemListView(generics.ListAPIView):
    serializer_class = TrustItemSerializer
    queryset = TrustItem.objects.filter(is_active=True)
