# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_auto_20150428_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offeritem',
            name='delivery_date',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
