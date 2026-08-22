from django.urls import path
from .views import LeadCreateView,SettingsView,TourDetailView,TourListView,VisaDetailView,VisaListView
urlpatterns=[path("settings/",SettingsView.as_view()),path("visa-services/",VisaListView.as_view()),path("visa-services/<slug:slug>/",VisaDetailView.as_view()),path("tours/",TourListView.as_view()),path("tours/<slug:slug>/",TourDetailView.as_view()),path("leads/",LeadCreateView.as_view())]
