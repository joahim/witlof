from django.shortcuts import render


def document(request, path):
    return render(request, 'demo/index.html')


def preview(request, path):
    return document(request, path)
