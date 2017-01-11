from django.conf.urls import url

from . import node, document

urlpatterns = [
    url(r'^node/(?P<node_id>(\d+))/$', node.node),
    url(r'^node/(?P<node_id>(\d+))/document/$', node.document),
    url(r'^node/(?P<node_id>(\d+))/children/(?P<current_node_id>(\d+))/$', node.children),
    url(r'^node/(?P<source_node_id>(\d+))/move/(?P<target_node_id>(\d+))/$', node.move),
    url(r'^node/(?P<node_a_id>(\d+))/swap-positions/(?P<node_b_id>(\d+))/$', node.swap_positions),

    url(r'^document/(?P<document_id>(\d+))/$', document.document),
    url(r'^document/(?P<document_id>(\d+))/duplicate/$', document.duplicate),
    url(r'^document/(?P<document_id>(\d+))/activate/$', document.activate),
    url(r'^document/(?P<document_id>(\d+))/deactivate/$', document.deactivate),
    url(r'^document/(?P<document_id>(\d+))/image/$', document.image),
    url(r'^document/(?P<document_id>(\d+))/attachment/$', document.attachment),
]
