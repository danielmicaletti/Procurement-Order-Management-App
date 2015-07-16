# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('eventlog', '0004_auto_20150714_1134'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='viewed',
            field=models.ManyToManyField(related_name='viewed_by', null=True, to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
    ]
