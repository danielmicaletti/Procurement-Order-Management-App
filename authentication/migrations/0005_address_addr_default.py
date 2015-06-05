# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_auto_20150604_1233'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='addr_default',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
