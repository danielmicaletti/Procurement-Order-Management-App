# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_auto_20150415_0927'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offeritem',
            old_name='prod_title',
            new_name='item_name',
        ),
    ]
