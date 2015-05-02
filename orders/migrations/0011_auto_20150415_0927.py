# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_reqitem_good'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offer',
            old_name='offer_addl_item',
            new_name='offer_misc_item',
        ),
        migrations.RenameField(
            model_name='offer',
            old_name='offer_addl_price',
            new_name='offer_misc_price',
        ),
    ]
