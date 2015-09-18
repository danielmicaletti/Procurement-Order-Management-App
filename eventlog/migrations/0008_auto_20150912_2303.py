# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eventlog', '0007_remove_log_notification_read'),
    ]

    operations = [
        migrations.RenameField(
            model_name='log',
            old_name='action',
            new_name='not_action',
        ),
    ]
