import json

from django.http import Http404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms import ModelForm
from django.core.urlresolvers import reverse

from .http import JsonResponseBadRequest

from ..models import Node, Document
from ..views import require_cms_user, get_site_default_document_template


def get_node_or_404(id, **kwargs):
    try:
        return Node.objects.get(id=id, **kwargs)
    except Node.DoesNotExist:
        raise Http404


class NodeForm(ModelForm):
    class Meta:
        model = Node
        fields = ['title', 'slug', 'position', 'description', 'is_subsite', 'show_in_menu', 'menu_title']


@require_cms_user
@require_http_methods(['GET', 'PUT', 'DELETE'])
def node(request, node_id):
    node = get_node_or_404(node_id)

    if request.method == 'GET':
        return JsonResponse({
            'node': node.to_json(),
            'children': [n.to_json() for n in node.children()],
            'revisions': [d.to_json() for d in node.documents.all().order_by('-revision')]
        })

    if request.method == 'PUT':
        data = json.loads(request.body)

        # Fill out missing fields
        for field in NodeForm.Meta.fields:
            data[field] = data.get(field, getattr(node, field))

        # Enforce root node
        if node.is_root():
            data.update({
                'slug': '',
                'is_subsite': False,
                'show_in_menu': False,
            })

        form = NodeForm(data, instance=node)
        if form.is_valid():
            form.save()
            node.update_path()
            node.save()
            return JsonResponse({})
        else:
            return JsonResponseBadRequest({})

    if request.method == 'DELETE':
        parent = node.parent()
        if parent is None:
            # do not delete root node
            return JsonResponse({'parentId': None})
        else:
            node.delete()
            return JsonResponse({'parentId': parent.id})


@require_cms_user
@require_http_methods(['POST'])
def document(request, node_id):
    node = get_node_or_404(node_id)
    Document(node=node, template=get_site_default_document_template().__name__).save()
    return JsonResponse({})


@require_cms_user
@require_http_methods(['GET'])
def children(request, node_id, current_node_id):
    node = get_node_or_404(node_id)
    current_node = get_node_or_404(current_node_id)

    def to_json(node):
        return {
            'id': node.id,
            'slug': node.slug,
            'title': node.title,
            'can_move_or_copy_here': not(node.is_descendant_of(current_node) or node == current_node.parent()),
            'has_children': node.descendant_set.filter(distance=1).count() > 0,
        }

    return JsonResponse({
        'children': [to_json(n) for n in node.children()]
    })


@require_cms_user
@require_http_methods(['POST'])
def move(request, source_node_id, target_node_id):
    source_node = get_node_or_404(source_node_id)
    target_node = get_node_or_404(target_node_id)
    if target_node.is_descendant_of(source_node) or target_node == source_node.parent():
        raise Http404
    source_node.move(target_node)
    return JsonResponse({'url': reverse('witlof:node', args=[target_node.id])})

# def copy_node(request, node_id):
#     if request.method == 'POST':
#         # TODO preveri ali target ze vsebuje node z enakim slugom kot je source
#         node = Node.objects.get(id=request.POST['node_id'])
#         target = Node.objects.get(id=request.POST['target_node_id'])
#         if target.is_descendant_of(node) or target == node.parent():
#             raise Http404
#         node.copy(target)
#         return HttpResponseRedirect(reverse('witlof:node', args=[target.id]))
#     else:
#         node = Node.objects.get(id=node_id)
#         root = node.root()
#         if root == node:
#             raise Http404
#         return render(request, 'witlof/node/copy.html', {
#             'root': root,
#             'node': node,
#             'node_action': u'Copy',
#             'root_is_target': not node.parent() == root,
#             'children': map(lambda n: (n, not n.is_descendant_of(node)), root.children()),
#         })
#
#
# @require_POST
# def copy_move_node_children(request, node_id):
#     node = Node.objects.get(id=node_id)
#     target = Node.objects.get(id=request.POST['target_id'])
#     return render(request, 'witlof/node/copy-move-children.html', {
#         'children': map(lambda n: (n, not n.is_descendant_of(node)), target.children()),
#     })


@require_cms_user
@require_http_methods(['PUT'])
def swap_positions(request, node_a_id, node_b_id):
    node_a = get_node_or_404(node_a_id)
    node_b = get_node_or_404(node_b_id)
    (pos_a, pos_b) = (node_a.position, node_b.position)
    node_a.position = pos_b
    node_b.position = pos_a
    node_a.save()
    node_b.save()
    return JsonResponse({})
