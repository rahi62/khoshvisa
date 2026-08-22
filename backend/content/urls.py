from django.urls import path
from .views import LandingDetailView, LandingListView, LeadCreateView, SettingsView

urlpatterns = [
    path("settings/", SettingsView.as_view(), name="settings"),
    path("visa-services/", LandingListView.as_view(), {"page_type": "visa"}, name="visa-list"),
    path("visa-services/<slug:slug>/", LandingDetailView.as_view(), {"page_type": "visa"}, name="visa-detail"),
    path("tours/", LandingListView.as_view(), {"page_type": "tour"}, name="tour-list"),
    path("tours/<slug:slug>/", LandingDetailView.as_view(), {"page_type": "tour"}, name="tour-detail"),
    path("leads/", LeadCreateView.as_view(), name="lead-create"),
]

