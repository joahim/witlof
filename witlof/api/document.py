from django import forms
from django.http import Http404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from ..models import Document, DocumentImage, DocumentAttachment
from ..views import require_cms_user


def get_document_or_404(id, **kwargs):
    try:
        return Document.objects.get(id=id, **kwargs)
    except Document.DoesNotExist:
        raise Http404


@require_cms_user
@require_http_methods(['GET', 'DELETE'])
def document(request, document_id):
    document = get_document_or_404(document_id, deleted=False)
    if request.method == 'DELETE':
        document.delete()
        return JsonResponse({})
    if request.method == 'GET':
        return JsonResponse({
            'schema': document.schema,
            'content': document.get_content(),
        })


@require_cms_user
@require_http_methods(['POST'])
def duplicate(request, document_id):
    get_document_or_404(document_id, deleted=False).duplicate()
    return JsonResponse({})


@require_cms_user
@require_http_methods(['PUT'])
def activate(request, document_id):
    get_document_or_404(document_id, deleted=False).activate()
    return JsonResponse({})


@require_cms_user
@require_http_methods(['PUT'])
def deactivate(request, document_id):
    get_document_or_404(document_id, deleted=False).deactivate()
    return JsonResponse({})


class UploadFileForm(forms.Form):
    file = forms.FileField()


@require_cms_user
@require_http_methods(['POST'])
def image(request, document_id):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        image = DocumentImage(
            document=get_document_or_404(document_id, deleted=False),
            image=request.FILES['file']
        )
        image.save()
        return JsonResponse(image.to_json())
    raise Http404


@require_cms_user
@require_http_methods(['POST'])
def attachment(request, document_id):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        attachment = DocumentAttachment(
            document=get_document_or_404(document_id, deleted=False),
            attachment=request.FILES['file']
        )
        attachment.save()
        return JsonResponse(attachment.to_json())
    raise Http404
