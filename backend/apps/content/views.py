from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteSettings,Tour,VisaService
from .serializers import LeadSerializer,SettingsSerializer,TourSerializer,VisaServiceSerializer
class SettingsView(APIView):
    def get(self,request):
        obj=SiteSettings.objects.first() or SiteSettings()
        return Response(SettingsSerializer(obj).data)
class VisaListView(generics.ListAPIView): serializer_class=VisaServiceSerializer;queryset=VisaService.objects.filter(is_published=True)
class VisaDetailView(generics.RetrieveAPIView): serializer_class=VisaServiceSerializer;lookup_field="slug";queryset=VisaService.objects.filter(is_published=True)
class TourListView(generics.ListAPIView): serializer_class=TourSerializer;queryset=Tour.objects.filter(is_published=True)
class TourDetailView(generics.RetrieveAPIView): serializer_class=TourSerializer;lookup_field="slug";queryset=Tour.objects.filter(is_published=True)
class LeadCreateView(generics.CreateAPIView): serializer_class=LeadSerializer
