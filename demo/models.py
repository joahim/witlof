from witlof.schema import *


# -----------------------------------------------------------------------------
# Grid

SPAN_TYPES = [('col-md-%d' % i, 'Col %d' % i) for i in range(1, 13)]
OFFSET_TYPES = [('', 'No offset')] + [('col-md-offset-%d' % i, 'Offset %d' % i) for i in range(1, 12)]

KIND_CHOICES = (
    ('one', 'One'),
    ('two', 'Two'),
    ('three', 'Three'),
)


# -----------------------------------------------------------------------------
# Simple

class Simple(Template):

    choice = CharField(u'Choice field', choices=KIND_CHOICES)
    char = CharField(u'Char field')
    text = TextField(u'Text field')
    html = HtmlField(u'Html field')
    image = ImageField(u'Image field')
    file = FileField(u'File field')
    link = DocumentLinkField(u'Document link field')

    class Meta:
        default = True
        template = 'demo/templates/simple.html'
        verbose_name = u'Simple'


# -----------------------------------------------------------------------------
# Default

class Default(Template):

    fields = ListField(Schema(
        choice=CharField(u'Choice field', choices=KIND_CHOICES),
        char=CharField(u'Char field'),
        text=TextField(u'Text field'),
        html=HtmlField(u'Html field'),
        image=ImageField(u'Image field'),
        file=FileField(u'Fil field'),
        link=DocumentLinkField(u'Document link field'),
    ), verbose_name='People')

    class Meta:
        default = True
        template = 'demo/templates/default.html'
        verbose_name = u'Default'

# -----------------------------------------------------------------------------
