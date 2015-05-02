# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0015_auto_20150429_0622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status_change_date',
            field=models.DateTimeField(),
            preserve_default=True,
        ),
    ]
