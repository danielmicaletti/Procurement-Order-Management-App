# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0008_auto_20150402_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='company_approval_by',
            field=models.ForeignKey(related_name='order_approved_by', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='order',
            name='modified_by',
            field=models.ForeignKey(related_name='order_modified_by', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='order',
            name='optiz_status_change_by',
            field=models.ForeignKey(related_name='optiz_approved_by', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='order',
            name='order_status_change_by',
            field=models.ForeignKey(related_name='order_status_changed_by', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
