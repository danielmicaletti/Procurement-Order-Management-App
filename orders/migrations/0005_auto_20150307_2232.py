# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0004_auto_20150307_2129'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='pub_date',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='wease_user',
        ),
        migrations.AddField(
            model_name='comment',
            name='created_by',
            field=models.ForeignKey(related_name='wease_user', default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='comment',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 7, 22, 32, 8, 843064, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='order',
            field=models.ForeignKey(related_name='order_comment', to='orders.Order'),
            preserve_default=True,
        ),
    ]
