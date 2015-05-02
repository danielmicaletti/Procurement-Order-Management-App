# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_auto_20150307_2316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_created_by',
            field=models.ForeignKey(related_name='order_created_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
