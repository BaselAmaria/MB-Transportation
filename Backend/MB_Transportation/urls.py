"""
URL configuration for MB_Transportation project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)

urlpatterns = [
    path('development-only/', admin.site.urls),
    # Api Auth
    path('auth/', include('users.urls')),
    # Api Main
    path('', include('main.urls')),
    # Documentation
    path("docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/swagger/docs/", SpectacularRedocView.as_view(url_name="schema"), name="redoc",),
    path("docs/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
