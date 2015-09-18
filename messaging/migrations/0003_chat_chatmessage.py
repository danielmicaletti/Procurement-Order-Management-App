# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0002_auto_20150912_2303'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('users', models.ManyToManyField(related_name='chat_users', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('chat_created', models.DateTimeField(auto_now_add=True)),
                ('chat_message', models.TextField(null=True, blank=True)),
                ('chat', models.ForeignKey(related_name='chat_group', to='messaging.Chat')),
                ('user', models.ForeignKey(related_name='chat_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-chat_created'],
            },
            bases=(models.Model,),
        ),
    ]
