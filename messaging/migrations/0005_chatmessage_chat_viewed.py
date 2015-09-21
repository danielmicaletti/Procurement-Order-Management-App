# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0004_auto_20150913_0221'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessage',
            name='chat_viewed',
            field=models.ManyToManyField(related_name='chat_viewed', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
