# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_auto_20150620_2223'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='active_user',
        ),
        migrations.DeleteModel(
            name='Activity',
        ),
    ]
