# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_auto_20150323_1423'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='company_approval_by',
        ),
        migrations.RemoveField(
            model_name='order',
            name='modified_by',
        ),
        migrations.RemoveField(
            model_name='order',
            name='optiz_status_change_by',
        ),
        migrations.RemoveField(
            model_name='order',
            name='order_status_change_by',
        ),
    ]
