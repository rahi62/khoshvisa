from whatsapp_leads.webhook import WhatsAppWebhookView
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/whatsapp/webhook/", WhatsAppWebhookView.as_view(), name="whatsapp-webhook"),
    path("health/", lambda request: JsonResponse({"status": "ok"}), name="health"),
    path("admin/", admin.site.urls),
    path("api/v1/", include("content.urls")),
]


# BEGIN DIGITALAFARIN CMS
from django.urls import include as _digitalafarin_cms_include, path as _digitalafarin_cms_path
urlpatterns += [_digitalafarin_cms_path("api/cms/v1/", _digitalafarin_cms_include("digitalafarin_cms.urls"))]
# END DIGITALAFARIN CMS

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
