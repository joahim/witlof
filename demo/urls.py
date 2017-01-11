from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static

from .views import document

urlpatterns = [
    url(r'^cms/', include('witlof.urls', namespace='witlof')),
    url(r'(?P<path>.*)', document, name='document'),
]

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
