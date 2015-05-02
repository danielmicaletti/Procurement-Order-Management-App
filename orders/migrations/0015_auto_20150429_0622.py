# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0014_auto_20150428_2256'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offer',
            old_name='offer_updated',
            new_name='offer_approval',
        ),
        migrations.RenameField(
            model_name='offer',
            old_name='offer_updated_by',
            new_name='offer_approval_by',
        ),
    ]
