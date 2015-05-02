# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20150307_2120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reqproduct',
            name='req_item',
            field=models.ForeignKey(related_name='req_product', to='orders.ReqItem'),
            preserve_default=True,
        ),
    ]
