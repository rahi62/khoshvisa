from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import LandingPage, Lead, SiteSettings
from .serializers import LandingPageSerializer, LeadSerializer, SiteSettingsSerializer


class SettingsView(APIView):
    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            settings = SiteSettings()
        return Response(SiteSettingsSerializer(settings).data)


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

