# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20150307_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reqitem',
            name='order',
            field=models.ForeignKey(related_name='req_order', to='orders.Order'),
            preserve_default=True,
        ),
    ]
