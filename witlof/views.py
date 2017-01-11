import inspect
import json
import importlib

import django.shortcuts
from django.shortcuts import redirect

from django import forms
from django.http import HttpResponseRedirect
from django.conf import settings
from django.core.urlresolvers import reverse, reverse_lazy
import django.contrib.auth.decorators

from . import schema
from .models import Node, Tree, Document


# -----------------------------------------------------------------------------
# Get site definition

site_models = importlib.import_module('%s.models' % settings.CMS_SITE_APP)

try:
    site_admin = importlib.import_module('%s.admin' % settings.CMS_SITE_APP)
except:
    site_admin = None


def get_site_document_templates():
    templates = [v for n, v in inspect.getmembers(site_models) if inspect.isclass(v) and issubclass(v, schema.Template) and v != schema.Template]
    if not len(templates):
        raise Exception(u'Site models do not define any templates.')
    else:
        return templates


def get_site_default_document_template():
    templates = get_site_document_templates()
    for t in templates:
        if 'default' in t.Meta.__dict__ and t.Meta.__dict__['default'] is True:
            return t
    else:
        return templates[0]


# -----------------------------------------------------------------------------
# Access

def can_access_cms(user):
    return (
        user is not None
        and user.is_authenticated()
        and user.is_active
        and user.has_perm('cms.use_cms')
    )


def require_cms_user(function):
    decorator = django.contrib.auth.decorators.user_passes_test(
        can_access_cms,
        login_url=reverse_lazy('witlof:login'),
    )
    return decorator(function)


# -----------------------------------------------------------------------------
# Render wrapper

def render(request, template, context=None, *args, **kwargs):

    if context is None:
        context = {}
    context['site_name'] = settings.CMS_SITE_NAME

    return django.shortcuts.render(request, template, context, *args, **kwargs)


# -----------------------------------------------------------------------------
# Home

@require_cms_user
def home(request):
    try:
        return render(request, 'witlof/index.html', {
            'root': Tree.root_node(),
            'last_updated_nodes': Node.objects.all().order_by('-updated')[:5],
        })
    except Node.DoesNotExist:
        raise Exception(u'Please initialize Witlof CMS by running ./manage.py witlof init')


# -----------------------------------------------------------------------------
# Node

@require_cms_user
def node(request, node_id):
    node = Node.objects.get(id=node_id)
    return render(request, 'witlof/node/index.html', {
        'node': node,
        'documents': node.documents.all().order_by('-revision'),
    })


@require_cms_user
def add_child_node(request, node_id):

    class NodeForm(forms.Form):
        slug = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class': 'form-control', 'size': '30'}))
        title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class': 'form-control', 'size': '30'}))

    node = Node.objects.get(id=node_id)

    if request.method == 'POST':
        form = NodeForm(request.POST)
        if form.is_valid():
            child = Node(slug=form.cleaned_data['slug'], title=form.cleaned_data['title'])
            node.add_child(child)
            Document(node=child, template=get_site_default_document_template().__name__).save()
            return redirect(reverse('witlof:node', args=[node.id]))
    else:
        form = NodeForm()

    return render(request, 'witlof/node/add.html', {
        'node': node,
        'node_action': u'Add document',
        'form': form,
    })


# -----------------------------------------------------------------------------
# Document

@require_cms_user
def document(request, document_id):

    document = Document.objects.get(id=document_id, deleted=False)

    if request.method == 'POST':
        if 'template' in request.POST:
            # change template
            document.template = request.POST['template']
            document.save()
            return HttpResponseRedirect(reverse('witlof:document', args=[document.id]))
        else:
            # save document content
            document.set_content(json.loads(request.POST['content']))
            document.save()
            if 'save-and-continue' in request.POST:
                return HttpResponseRedirect(reverse('witlof:document', args=[document.id]))
            elif 'save-and-preview' in request.POST:
                return HttpResponseRedirect(reverse('witlof:preview_document', args=[document.id]))
            else:
                return HttpResponseRedirect(reverse('witlof:node', args=[document.node.id]))

    else:
        if hasattr(settings, 'FROALA_ACTIVATION_KEY'):
            FROALA_ACTIVATION_KEY = settings.FROALA_ACTIVATION_KEY
        else:
            FROALA_ACTIVATION_KEY = None

        return render(request, 'witlof/document/index.html', {
            'node': document.node,
            'node_action': u'Revision %s' % document.revision,
            'document': document,
            'templates': [(t.__name__, t.Meta.__dict__.get('verbose_name', t.__name__)) for t in get_site_document_templates()],
            'FROALA_ACTIVATION_KEY': FROALA_ACTIVATION_KEY,
        })


def document_renderer(document):
    admin = '%sAdmin' % document.template
    if site_admin and admin in site_admin.__dict__ and 'preview' in site_admin.__dict__.get(admin).__dict__:
        # Custom document preview for document's template
        return site_admin.__dict__.get(admin).__dict__.get('preview')
    elif site_admin and 'Meta' in site_admin.__dict__ and 'preview' in site_admin.Meta.__dict__:
        # Default document preview for all templates
        return site_admin.Meta.__dict__.get('preview')
    else:
        return None


@require_cms_user
def preview_document(request, document_id):
    document = Document.objects.get(id=document_id, deleted=False)
    if document_renderer(document):
        return render(request, 'witlof/document/preview/index.html', {
            'node': document.node,
            'document': document,
            'referer': request.META.get('HTTP_REFERER', None)
        })
    else:
        return render(request, 'witlof/document/preview/missing.html', {
            'node': document.node,
            'node_action': u'Revision %s' % document.revision,
            'document': document,
        })


@require_cms_user
def preview_document_info_frame(request, document_id):
    document = Document.objects.get(id=document_id, deleted=False)
    return render(request, 'witlof/document/preview/info.html', {
        'node': document.node,
        'document': document,
        'referer': request.GET.get('referer', None)
    })


@require_cms_user
def preview_document_content_frame(request, document_id):
    document = Document.objects.get(id=document_id, deleted=False)
    return document_renderer(document)(request, document)

# -----------------------------------------------------------------------------
