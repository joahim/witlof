from collections import OrderedDict
from .fields import Field


class TemplateBase(type):

    def __new__(cls, name, bases, attrs):

        # Ensure initialization is only performed for subclasses of Template excluding Template
        parents = [b for b in bases if isinstance(b, TemplateBase)]
        if not parents:
            return super(TemplateBase, cls).__new__(cls, name, bases, attrs)

        # Create new class
        new_class = super(TemplateBase, cls).__new__(
            cls, name, bases, {'__name__': name, '__module__': attrs.pop('__module__')})

        # Collect fields from parents and this
        fields = {}
        for parent in parents:
            if getattr(parent, '_fields', None) is not None:
                for field in parent._fields:
                    fields[field.name] = field
        for attr_name, attr in attrs.items():
            if isinstance(attr, Field):
                setattr(attr, 'name', attr_name)
                fields[attr_name] = attr

        # Assign fields sorted by creation_counter
        new_class._fields = sorted(
            fields.values(),
            lambda a, b: cmp(a.creation_counter, b.creation_counter)
        )

        # Create class props
        for name, obj in attrs.items():
            setattr(new_class, name, obj)

        return new_class


class Template(object):

    __metaclass__ = TemplateBase

    def __init__(self, data=None):
        self._data = data if data is not None else {}

    class Meta():
        template = None
        verbose_name = None

    @classmethod
    def build(cls, **attrs):
        attrs.update({'__module__': cls.__module__})
        return TemplateBase('TemplatePart', (cls,), attrs)

    @classmethod
    def wrap(cls, data):
        instance = cls()
        instance._data = data if data is not None else {}
        return instance

    def _get_schema(self):
        return {
            'template': self.__name__,
            'fields': [field.get_schema() for field in self._fields]
        }

    def _get_content(self):
        return OrderedDict([(field.name, field.to_content(self._data.get(field.name, field.empty))) for field in self._fields])

    def _get_extended_content(self):
        # For calculated values in image and file fields (used in JS).
        # In contrast, _get_content returns minimal values, used to store document data in DB.
        return OrderedDict([(field.name, field.to_extended_content(self._data.get(field.name, field.empty))) for field in self._fields])

    def _set_content(self, data):
        self._data = data if data is not None else {}

    @property
    def filename(self):
        return self.Meta.template
