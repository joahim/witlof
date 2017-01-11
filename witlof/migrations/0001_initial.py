# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-11 12:30
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False)),
                ('deleted', models.BooleanField(default=False)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(default=django.utils.timezone.now)),
                ('revision', models.IntegerField()),
                ('template', models.CharField(max_length=255)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
            ],
            options={
                'ordering': ['node', '-revision'],
            },
        ),
        migrations.CreateModel(
            name='DocumentAttachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('attachment', models.FileField(max_length=500, upload_to=b'witlof/attachments/%Y/%m/%d/')),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='witlof.Document')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('image', models.ImageField(height_field=b'height', max_length=500, upload_to=b'witlof/images/%Y/%m/%d/', width_field=b'width')),
                ('width', models.PositiveIntegerField()),
                ('height', models.PositiveIntegerField()),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='witlof.Document')),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(blank=True, max_length=500)),
                ('title', models.CharField(max_length=500)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('path', models.CharField(max_length=5000, unique=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(default=django.utils.timezone.now)),
                ('position', models.IntegerField()),
                ('show_in_menu', models.BooleanField(default=False, verbose_name='Show in menu')),
                ('menu_title', models.CharField(blank=True, max_length=500, null=True, verbose_name='Title in menu')),
                ('is_subsite', models.BooleanField(default=False, verbose_name='Subsite')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Tree',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.IntegerField()),
                ('ancestor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='descendant_set', to='witlof.Node')),
                ('node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ancestor_set', to='witlof.Node')),
            ],
            options={
                'permissions': [('use_cms', 'Can use CMS System')],
            },
        ),
        migrations.AddField(
            model_name='document',
            name='node',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='witlof.Node'),
        ),
    ]