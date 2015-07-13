# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_auto_20150620_2223'),
        ('eventlog', '0002_auto_20150113_1450'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='company',
            field=models.ForeignKey(blank=True, to='authentication.Company', null=True),
            preserve_default=True,
        ),
    ]
