from django.conf import settings
from django.conf.urls import url, include
import django.contrib.auth.views
from django.core.urlresolvers import reverse_lazy

from . import views
from .search.views import search

urlpatterns = [
    url(r'^$', views.home, name='home'),

    # Login / logout
    url(r'^login/$', django.contrib.auth.views.login, {'template_name': 'witlof/login.html', 'extra_context': {'site_name': settings.CMS_SITE_NAME, 'default_next': reverse_lazy('witlof:home')}}, name='login'),
    url(r'^logout/$', django.contrib.auth.views.logout_then_login, {'login_url': reverse_lazy('witlof:login')}, name='logout'),

    # API
    url(r'^api/', include('witlof.api.urls')),

    # Search
    url(r'^search/$', search, name='search'),

    # Node
    url(r'^node/(?P<node_id>\d+)/$', views.node, name='node'),
    url(r'^node/(?P<node_id>\d+)/add/$', views.add_child_node, name='add_child_node'),
    # url(r'^node/(?P<node_id>\d+)/copy/$', views.copy_node, name='copy_node'),
    # url(r'^node/(?P<node_id>\d+)/move/$', views.move_node, name='move_node'),
    # url(r'^node/(?P<node_id>\d+)/copy-move-children/$', views.copy_move_node_children, name='copy_move_node_children'),

    # Document
    url(r'^document/(?P<document_id>\d+)/$', views.document, name='document'),
    url(r'^document/(?P<document_id>\d+)/preview/$', views.preview_document, name='preview_document'),
    url(r'^document/(?P<document_id>\d+)/preview/info/$', views.preview_document_info_frame, name='preview_document_info_frame'),
    url(r'^document/(?P<document_id>\d+)/preview/content/$', views.preview_document_content_frame, name='preview_document_content_frame'),
]
