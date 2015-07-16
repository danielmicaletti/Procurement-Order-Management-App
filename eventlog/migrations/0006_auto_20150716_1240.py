# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('eventlog', '0005_log_viewed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='log',
            name='viewed',
        ),
        migrations.AddField(
            model_name='log',
            name='viewed_by',
            field=models.ManyToManyField(related_name='user_viewed', null=True, to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
    ]
