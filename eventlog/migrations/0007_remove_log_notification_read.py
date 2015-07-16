# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eventlog', '0006_auto_20150716_1240'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='log',
            name='notification_read',
        ),
    ]
