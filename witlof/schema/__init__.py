from .base import Template
from .fields import DictField, ListField, CharField, TextField, HtmlField, ImageField, FileField, DocumentLinkField

Schema = Template.build

__all__ = [
    'Template',
    'Schema',
    'DictField',
    'ListField',
    'CharField',
    'TextField',
    'HtmlField',
    'ImageField',
    'FileField',
    'DocumentLinkField',
]
