import re
import importlib
import itertools
import magic

from django.db import models
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.contrib.postgres.fields import JSONField
from django.conf import settings

mime = magic.Magic(mime=True)

site_models = importlib.import_module('%s.models' % settings.CMS_SITE_APP)


# -----------------------------------------------------------------------------
# Node

class Node(models.Model):
    slug = models.SlugField(max_length=500, blank=True)
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=500, null=True, blank=True)
    path = models.CharField(max_length=5000, unique=True)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(default=timezone.now)
    position = models.IntegerField()
    show_in_menu = models.BooleanField(u'Show in menu', default=False)
    menu_title = models.CharField(u'Title in menu', max_length=500, null=True, blank=True)
    is_subsite = models.BooleanField(u'Subsite', default=False)

    class Meta:
        ordering = ['title']

    def __unicode__(self):
        return u'<Node %s>' % (self.path)

    def to_json(self):
        return {
            'id': self.id,
            'slug': self.slug,
            'title': self.title,
            'description': self.description,
            'path': self.path,
            'created': self.created,
            'updated': self.updated,
            'position': self.position,
            'show_in_menu': self.show_in_menu,
            'menu_title': self.menu_title,
            'is_subsite': self.is_subsite,
        }

    @property
    def path_sans_lang(self):
        return '/'.join(self.path.split('/')[1:])

    def is_root(self):
        return self.path == ''

    def root(self):
        return self.ancestors()[0]

    def parent(self):
        try:
            return map(lambda t: t.ancestor, self.ancestor_set.filter(distance=1))[0]
        except IndexError:
            return None

    def children(self):
        return [t.node for t in self.descendant_set.filter(distance=1).order_by('node__position').select_related()]

    def descendants(self):
        return [t.node for t in self.descendant_set.filter(distance__gte=1).order_by('distance', 'node__position').select_related()]

    def ancestors(self):
        return [t.ancestor for t in self.ancestor_set.all().order_by('-distance').select_related()]

    def get_next_position(self):
        try:
            return max(map(lambda n: n.position, self.children())) + 1
        except ValueError:
            return 1

    def get_next_document_revision(self):
        try:
            return max(map(lambda d: d.revision, self.documents.all())) + 1
        except ValueError:
            return 1

    @property
    def has_active_revision(self):
        return Document.objects.filter(node=self, active=True).count() > 0

    def get_active_revision(self):
        try:
            return Document.objects.get(node=self, active=True)
        except Document.DoesNotExist:
            return None

    def deactivate_active_document(self):
        for d in Document.objects.filter(node=self, active=True):
            d.active = False
            d.save()

    def add_child(self, child):
        child.position = self.get_next_position()
        child.path = '%s%s/' % (self.path, child.slug)
        child.save()
        for t in self.ancestor_set.all():
            Tree(node=child, ancestor=t.ancestor, distance=t.distance + 1).save()
        Tree(node=child, ancestor=child, distance=0).save()

    def is_descendant_of(self, node):
        if self == node:
            return True
        else:
            return node.descendant_set.filter(node=self).count() > 0

    def update_path_aux(node, path=None):
        if path is not None:
            node.path = '%s%s/' % (path, node.slug)
            node.save()
        for n in node.children():
            n.update_path_aux(node.path)

    def update_path(self):
        parent = self.parent()
        if parent:
            # non-root node
            self.update_path_aux(parent.path)
        else:
            # root node
            self.update_path_aux()

    def delete(self, *args, **kwargs):
        for n in self.children():
            n.delete(*args, **kwargs)
        super(Node, self).delete(*args, **kwargs)

    def move(self, target):
        children = self.children()
        self.ancestor_set.all().delete()
        self.descendant_set.all().delete()
        target.add_child(self)
        for n in children:
            n.move(self)

    def copy(self, target):
        children = self.children()
        node_copy = Node(slug=self.slug, title=self.title)
        target.add_child(node_copy)
        for d in self.documents.all():
            d.copy_to_node(node_copy)
        for n in children:
            n.copy(node_copy)

    def subtree(self):
        def aux(self, lst):
            children = self.children()
            for c in children:
                lst.append(c)
                sublst = aux(c, [])
                if len(sublst):
                    lst.append(sublst)
            return lst
        return aux(self, [])

    def menu(self, at_depth=None):
        '''
        Get nodes that are shown in menu.
        If at_depth is not specified, return the children of this node.
        If at_depth is specified, return the children of ancestor at position at_depth from root (root is at_depth=0).
        '''
        if at_depth is None:
            parent = self
        else:
            try:
                parent = self.ancestors()[at_depth]
            except IndexError:
                return []
        return [n for n in parent.children() if n.show_in_menu]


# -----------------------------------------------------------------------------
# Tree

class Tree(models.Model):
    node = models.ForeignKey(Node, related_name='ancestor_set')
    ancestor = models.ForeignKey(Node, related_name='descendant_set')
    distance = models.IntegerField()

    def __unicode__(self):
        return u'<Leaf %s %s %d>' % (self.node.id, self.ancestor.id, self.distance)

    class Meta:
        permissions = [('use_cms', 'Can use CMS System')]

    @classmethod
    def root_node(cls):
        return Node.objects.get(path='')


# -----------------------------------------------------------------------------
# Document

class Document(models.Model):
    node = models.ForeignKey(Node, related_name='documents')
    active = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(default=timezone.now)
    revision = models.IntegerField()
    template = models.CharField(max_length=255)
    data = JSONField(null=True, blank=True)

    class Meta:
        ordering = ['node', '-revision']

    def __unicode__(self):
        return u'<Document %s>' % self.id

    def to_json(self):
        return {
            'id': self.id,
            'url': reverse('witlof:document', args=[self.id]),
            'preview_url': reverse('witlof:preview_document', args=[self.id]),
            'active': self.active,
            'deleted': self.deleted,
            'revision': self.revision,
            'created': self.created,
            'updated': self.updated,
        }

    def save(self):
        now = timezone.now()

        # Update document
        if not self.revision:
            self.revision = self.node.get_next_document_revision()
        self.updated = now

        # Update node
        self.node.updated = self.updated
        self.node.save()

        documents = list(Document.objects.filter(node=self.node).exclude(id=self.id))

        def findall_in_content(document, pattern):
            return set(itertools.chain.from_iterable([
                re.findall(pattern, unicode(doc.data))
                for doc in [self] + documents
            ]))

        # Delete images deleted in content (check all revisions)
        images_in_content = findall_in_content(self, r'<img.+?src="(?P<url>[^"]+)"')
        images_in_content.update(findall_in_content(self, r'u\'(?P<url>/media/witlof/images/[^\']+)\''))
        for image in self.images.all():
            if image.image.url not in images_in_content:
                image.image.storage.delete(image.image.path)
                image.delete()

        # Delete attachments deleted in content (check all revisions)
        attachments_in_content = findall_in_content(self, r'<a.+?href="(?P<url>[^"]+)"')
        attachments_in_content.update(findall_in_content(self, r'u\'(?P<url>/media/witlof/attachments/[^\']+)\''))
        for attachment in self.attachments.all():
            if attachment.attachment.url not in attachments_in_content:
                attachment.attachment.storage.delete(attachment.attachment.path)
                attachment.delete()

        super(Document, self).save()

    @property
    def template_filename(self):
        return getattr(site_models, self.template)().filename

    @property
    def content(self):
        content = getattr(site_models, self.template)()
        content._set_content(self.data)
        return content

    @property
    def schema(self):
        return self.content._get_schema()

    def set_content(self, data):
        # set arbitrary JSON via schema
        content = getattr(site_models, self.template)()
        content._set_content(data)
        self.data = content._get_content()

    def get_content(self):
        return self.content._get_extended_content()

    def activate(self):
        if not self.active:
            self.node.deactivate_active_document()
            self.active = True
            self.save()

    def deactivate(self):
        if self.active:
            self.active = False
            self.save()

    def delete(self):
        if self.active:
            self.active = False
        if not self.deleted:
            self.updated = timezone.now()
        self.deleted = True
        super(Document, self).save()

    def copy_images(self, copy):
        for image in self.images.all():
            DocumentImage(
                document=copy,
                created=copy.updated,
                image=image.image,
            ).save()

    def copy_attachments(self, copy):
        for attachment in self.attachments.all():
            DocumentAttachment(
                document=copy,
                created=copy.updated,
                attachment=attachment.attachment,
                content_type=attachment.content_type
            ).save()

    def copy_to_node(self, target):
        copy = Document(
            node=target,
            active=True,
            deleted=self.deleted,
            revision=self.revision,
            template=self.template,
            data=self.data,
        )
        copy.save()
        self.copy_images(copy)
        self.copy_attachments(copy)
        return copy

    def duplicate(self):
        copy = Document(
            node=self.node,
            template=self.template,
            data=self.data,
        )
        copy.save()
        self.copy_images(copy)
        self.copy_attachments(copy)
        return copy


# -----------------------------------------------------------------------------
# Images

class DocumentImage(models.Model):

    document = models.ForeignKey(Document, related_name='images')
    created = models.DateTimeField(default=timezone.now)

    image = models.ImageField(
        upload_to='witlof/images/%Y/%m/%d/%H/%M/%S/',
        max_length=500,
        width_field='width',
        height_field='height'
    )
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()

    def __unicode__(self):
        return u'<DocumentImage %s - %s>' % (self.document.id, self.image.url)

    @property
    def name(self):
        m = re.match(r'^(.*/)?(?P<name>.+)', self.image.name)
        return m.group('name')

    @property
    def content_type(self):
        return mime.from_file(self.image.file.name)

    @property
    def size(self):
        return self.image.file.size

    def to_json(self):
        return {
            'id': self.id,
            'link': self.image.url,
            'name': self.name,
            'content_type': self.content_type,
            'size': self.size,
            'width': self.width,
            'height': self.height,
        }


# -----------------------------------------------------------------------------
# Attachments

class DocumentAttachment(models.Model):

    document = models.ForeignKey(Document, related_name='attachments')
    created = models.DateTimeField(default=timezone.now)

    attachment = models.FileField(upload_to='witlof/attachments/%Y/%m/%d/%H/%M/%S/', max_length=500)

    def __unicode__(self):
        return u'<DocumentAttachment %s - %s>' % (self.document.id, self.attachment.url)

    @property
    def name(self):
        m = re.match(r'^(.*/)?(?P<name>.+)', self.attachment.name)
        return m.group('name')

    @property
    def content_type(self):
        return mime.from_file(self.attachment.file.name)

    @property
    def size(self):
        return self.attachment.file.size

    def to_json(self):
        return {
            'id': self.id,
            'link': self.attachment.url,
            'name': self.name,
            'content_type': self.content_type,
            'size': self.size,
        }

# -----------------------------------------------------------------------------
