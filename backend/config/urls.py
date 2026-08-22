from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("content.urls")),
]


# BEGIN DIGITALAFARIN CMS
from django.urls import include as _digitalafarin_cms_include, path as _digitalafarin_cms_path
urlpatterns += [_digitalafarin_cms_path("api/cms/v1/", _digitalafarin_cms_include("digitalafarin_cms.urls"))]
# END DIGITALAFARIN CMS
