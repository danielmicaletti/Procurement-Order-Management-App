# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0002_offer_offer_approval_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='reqitem',
            name='req_item_created',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 5, 6, 18, 50, 447005, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reqitem',
            name='req_item_created_by',
            field=models.ForeignKey(related_name='req_item_modified_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='reqitem',
            name='req_item_modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 5, 6, 19, 16, 94419, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reqitem',
            name='req_item_modified_by',
            field=models.ForeignKey(related_name='req_item_created_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
