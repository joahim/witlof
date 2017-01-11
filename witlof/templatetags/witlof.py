# -*- coding: utf-8 -*-

import re
from bs4 import BeautifulSoup as BeautifulSoup4

from django.conf import settings
from django.template.defaultfilters import stringfilter
from django.core.urlresolvers import reverse
from django import template

from ..models import Node

register = template.Library()


def BeautifulSoup(html):
    return BeautifulSoup4(html, 'lxml')


def tag_contents(element):
    if not element:
        return ''
    return ''.join([unicode(el) for el in element.contents])


# -----------------------------------------------------------------------------
# Filter: menu of node

@register.filter
def menu(node, at_depth=None):
    try:
        if at_depth is None:
            return node.menu()
        else:
            return node.menu(at_depth=int(at_depth))
    except:
        return ''


# -----------------------------------------------------------------------------
# Filter: node is descendant of node

@register.filter
def is_descendant_of(node1, node2):
    try:
        return node1.is_descendant_of(node2)
    except:
        return ''


# -----------------------------------------------------------------------------
# Filter: url of node id

@register.filter
@stringfilter
def url_of_node_id(value, arg=None):
    try:
        node = Node.objects.get(id=value)
        return reverse(settings.CMS_SITE_VIEW, args=[node.path])
    except:
        return ''


# -----------------------------------------------------------------------------
# CMS tags

@register.filter
@stringfilter
def cmstags(value, arg=None):

    soup = BeautifulSoup(value)

    tag_a(soup)

    return tag_contents(soup.find('body'))


def tag_a(soup):

    """Insert document link based on data-node-id attribute."""

    for tag in soup.find_all('a', attrs={"data-node-id": re.compile(r'\d+')}):
        try:
            node = Node.objects.get(id=tag['data-node-id'])
            tag['href'] = reverse(settings.CMS_SITE_VIEW, args=[node.path])
            del tag['data-node-id']
        except:
            tag.replace_with(BeautifulSoup('<span class="label label-warning">Document ID=%s not found</span>' % tag.attrs.get('data-node-id', None)))

# -----------------------------------------------------------------------------
