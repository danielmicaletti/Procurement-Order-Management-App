# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_auto_20150416_1306'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offer',
            name='offer_misc_item',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='offer_misc_price',
        ),
        migrations.RemoveField(
            model_name='offeritem',
            name='item_fam',
        ),
        migrations.RemoveField(
            model_name='offeritem',
            name='item_subfam',
        ),
        migrations.AlterField(
            model_name='order',
            name='offer_version',
            field=models.SmallIntegerField(default=0, max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
