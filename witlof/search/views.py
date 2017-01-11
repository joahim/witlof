from django.shortcuts import render_to_response
from django.db.models import Q

from django.conf import settings

from ..models import Node, Document


class Result(object):

    def __init__(self, node=None, documents=None):
        self.node = node
        self.documents = documents

    def add_document(self, document):
        if self.documents is None:
            self.documents = []
        self.documents.append(document)


def search(request):

    results = None
    query = request.GET.get('q', None)
    active = True if 'active' in request.GET else False

    if query is not None:
        queryset = Node.objects.all()
        if active:
            queryset = queryset.filter(Q(title__icontains=query) | Q(slug__icontains=query) | (Q(documents__data__icontains=query) & Q(documents__active=True)))
        else:
            queryset = queryset.filter(Q(title__icontains=query) | Q(slug__icontains=query) | Q(documents__data__icontains=query))

        results = [Result(node=n) for n in queryset.distinct().order_by('title')]

        document_queryset = Document.objects.filter(data__icontains=query)
        if active:
            document_queryset = document_queryset.filter(active=True)
        for document in document_queryset.order_by('-revision'):
            for result in results:
                if result.node.id == document.node.id:
                    result.add_document(document)

    return render_to_response('witlof/search/index.html', {
        'user': request.user,
        'query': query,
        'results': results,
        'site_name': settings.CMS_SITE_NAME
    })
