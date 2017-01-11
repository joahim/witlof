import re

import witlof.models


class Field(object):

    empty = None
    creation_counter = 0

    def __init__(self, verbose_name=None):
        self.provided_verbose_name = verbose_name
        self.creation_counter = Field.creation_counter
        Field.creation_counter += 1

    def __get__(self, instance, owner):
        value = instance._data.get(self.name)
        return self.to_python(value)

    def __set__(self, instance, value):
        if value is not None:
            value = self.to_content(value)
        instance._data[self.name] = value

    def to_python(self, value):
        return value

    def to_content(self, value):
        return value

    def to_extended_content(self, value):
        return self.to_content(value)

    @property
    def verbose_name(self):
        if self.provided_verbose_name is None:
            return re.sub(r'_+', ' ', self.name.capitalize())
        else:
            return self.provided_verbose_name


class DictField(Field):

    empty = {}

    def __init__(self, schema, verbose_name=None):
        self.schema = schema
        super(DictField, self).__init__(verbose_name)

    def to_python(self, value):
        return self.schema.wrap(value)

    def to_content(self, value):
        return self.schema(value)._get_content()

    def to_extended_content(self, values):
        return self.schema(values)._get_extended_content()

    def get_schema(self):
        return {
            'type': 'DictField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'fields': [field.get_schema() for field in self.schema._fields]
        }


class ListField(Field):

    empty = []

    def __init__(self, schema, verbose_name=None):
        self.schema = schema
        super(ListField, self).__init__(verbose_name)

    def to_python(self, values):
        return [self.schema.wrap(value) for value in values]

    def to_content(self, values):
        return [self.schema.wrap(value)._get_content() for value in values]

    def to_extended_content(self, values):
        return [self.schema.wrap(value)._get_extended_content() for value in values]

    def get_schema(self):
        return {
            'type': 'ListField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'fields': [field.get_schema() for field in self.schema._fields]
        }


class TextField(Field):

    def get_schema(self):
        return {
            'type': 'TextField',
            'name': self.name,
            'verbose_name': self.verbose_name,
        }


class HtmlField(Field):

    options = {
        'froala': {
            'saveInterval': 0,
            'placeholderText': '',

            # Links
            'linkList': [],
            'linkText': True,
            'linkInsertButtons': ['linkBack'],
            'linkAutoPrefix': '',
            'linkEditButtons': ['linkOpen', 'linkEdit', 'linkRemove'],

            # Image manipulation
            'imageDefaultAlign': 'left',
            'imageResize': False,
            'imageDefaultWidth': 0,
            'imageEditButtons': [
                'imageAlt', 'imageLink',
                '|',
                'imageDisplay', 'imageAlign', 'imageStyle', 'imageSize',
                '|',
                'imageReplace', 'imageRemove',
            ],
            'imageStyles': {
                'rounded': 'Rounded',
                'square': 'Square',
            },
            'imageInsertButtons': ['imageUpload', 'imageByURL'],

            # Image upload
            'imageUploadMethod': 'POST',
            'imageUploadParam': 'file',
            'imageUploadParams': {},
            'imageMaxSize': 1024 * 1024 * 10,

            # Attachment upload
            'attachmentUploadMethod': 'POST',
            'attachmentUploadParam': 'file',
            'attachmentUploadParams': {},
            'attachmentMaxSize': 1024 * 1024 * 100,

            # Video
            'videoDefaultAlign': 'left',
            'videoEditButtons': ['videoDisplay', 'videoAlign', 'videoSize', 'videoRemove'],
            'videoInsertButtons': ['videoBack', '|', 'videoByURL', 'videoEmbed'],
            'videoResize': True,
            'videoSizeButtons': ['videoBack', '|'],

            # buttons: [ 'undo', 'redo', 'sep', 'bold', 'italic', 'strikeThrough', 'subscript', 'superscript', 'sep', 'align', 'outdent', 'indent', 'formatBlock', 'blockStyle', 'inlineStyle', 'removeFormat', 'sep', 'insertHorizontalRule', 'insertOrderedList', 'insertUnorderedList', 'createLink', 'table', 'insertImage', 'uploadFile', 'insertVideo', 'sep', 'fullscreen', 'html'],
            #
            # blockTags: {
            #   n: 'Normal',
            #   div: 'DIV',
            #   blockquote: 'Quote',
            #   code: 'Code',
            #   h2: 'Heading 2',
            #   h3: 'Heading 3',
            #   h4: 'Heading 4',
            # },
            #
            # icons: {
            #   formatBlock: {
            #     type: 'font',
            #     value: 'fa fa-header'
            #   },
            #   insertVideo: {
            #     type: 'font',
            #     value: 'fa fa-youtube-play'
            #   },
            #   blockStyle: {
            #     type: 'font',
            #     value: 'fa fa-arrows-v'
            #   },
            #   inlineStyle: {
            #     type: 'font',
            #     value: 'fa fa-arrows-h'
            #   },
            # },
            #
            # defaultBlockStyle: {
            #   'class1': 'Class 1',
            #   'class2': 'Class 2'
            # },
            #
            # blockStyles: {
            #   'p': {
            #     'class1': 'Class 3',
            #     'class2': 'Class 4'
            #   },
            #   'h1': {
            #     'class3': 'Class 5',
            #     'class4': 'Class 6'
            #   }
            # }
        }
    }

    def get_schema(self):
        return {
            'type': 'HtmlField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'options': self.options,
        }


class SimpleField(Field):

    def __init__(self, verbose_name=None, choices=None):
        self.choices = choices
        super(SimpleField, self).__init__(verbose_name)


class CharField(SimpleField):

    def get_schema(self):
        return {
            'type': 'CharField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'choices': self.choices,
        }


class ImageField(SimpleField):

    def to_python(self, value):
        try:
            return None if value is None else witlof.models.DocumentImage.objects.get(id=value['id'])
        except witlof.models.DocumentImage.DoesNotExist:
            return None

    def to_content(self, value):
        return None if value is None else {
            'id': value['id'],
            'link': value['link'],
        }

    def to_extended_content(self, value):
        try:
            return None if value is None else witlof.models.DocumentImage.objects.get(id=value['id']).to_json()
        except witlof.models.DocumentImage.DoesNotExist:
            return None

    def get_schema(self):
        return {
            'type': 'ImageField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'choices': self.choices,
        }


class FileField(SimpleField):

    def to_python(self, value):
        try:
            return None if value is None else witlof.models.DocumentAttachment.objects.get(id=value['id'])
        except witlof.models.DocumentAttachment.DoesNotExist:
            return None

    def to_content(self, value):
        return None if value is None else {
            'id': value['id'],
            'link': value['link'],
        }

    def to_extended_content(self, value):
        try:
            return None if value is None else witlof.models.DocumentAttachment.objects.get(id=value['id']).to_json()
        except witlof.models.DocumentAttachment.DoesNotExist:
            return None

    def get_schema(self):
        return {
            'type': 'FileField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'choices': self.choices,
        }


class DocumentLinkField(SimpleField):

    def to_python(self, value):
        try:
            return None if value is None else witlof.models.Node.objects.get(id=value).get_active_revision()
        except witlof.models.Node.DoesNotExist:
            return None

    def to_content(self, value):
        try:
            return value['id']
        except:
            return None

    def to_extended_content(self, value):
        try:
            return None if value is None else witlof.models.Node.objects.get(id=value).to_json()
        except witlof.models.Node.DoesNotExist:
            return None

    def get_schema(self):
        return {
            'type': 'DocumentLinkField',
            'name': self.name,
            'verbose_name': self.verbose_name,
            'choices': self.choices,
        }
