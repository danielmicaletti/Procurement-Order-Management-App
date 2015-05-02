# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='addr_updated_by',
            field=models.ForeignKey(related_name='address_updated_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
