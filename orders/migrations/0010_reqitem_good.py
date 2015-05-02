# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_auto_20150402_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='reqitem',
            name='good',
            field=models.ForeignKey(related_name='req_good', default=1, to='orders.Good'),
            preserve_default=False,
        ),
    ]
