# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eventlog', '0003_log_company'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='notification',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='notification_read',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
