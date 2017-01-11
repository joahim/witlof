# Witlof

Witlof - a Django CMS

## Setup

Include `witlof` in you `INSTALLED_APPS`.

In you `setting.py` file provide the following settings:

    CMS_SITE_APP = 'app_name'
    CMS_SITE_NAME = 'Application verbose name'

Define models in your `app_name.models`:

    from witlof.schema import *

    class Simple(Template):

        char = CharField(u'Char field')
        choice = CharField(u'Choice field', choices=KIND_CHOICES)
        text = TextField(u'Text field')
        html = HtmlField(u'Html field')
        image = ImageField(u'Image field')
        file = FileField(u'File field')
        link = DocumentLinkField(u'Document link field')

        fields = ListField(Schema(
            char=CharField(u'Char field'),
        ), verbose_name='List of fields')

        class Meta:
            default = True
            template = 'path/to/template.html'
            verbose_name = u'Template verbose name'

Provide the preview view in `app_name.admin`:

    class Meta:
      preview = views.preview


## Development setup

    virtualenv var/virtualenv
    . var/virtualenv/bin/activate.fish
    pip install -r requirements.txt
    createdb witlof
    cd witlof/settings/ ; ln -s develop.py __init__.py ; cd -
    ./manage.py migrate
    ./manage.py loaddata var/fixtures/auth.json
    bower install
    npm install
    ./manage.py runserver
    gulp

User credentials: demo / demo

## Creating python package

    python setup.py sdist

## Drop DB tables

    DROP TABLE witlof_documentimage;
    DROP TABLE witlof_documentattachment;
    DROP TABLE witlof_document;
    DROP TABLE witlof_tree;
    DROP TABLE witlof_node;
    DELETE FROM django_migrations WHERE app='witlof';

## TODO

[ ] Unique node names (on parent)
