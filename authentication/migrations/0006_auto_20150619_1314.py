# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_address_addr_default'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='city',
        ),
        migrations.RemoveField(
            model_name='company',
            name='country',
        ),
        migrations.RemoveField(
            model_name='company',
            name='email',
        ),
        migrations.RemoveField(
            model_name='company',
            name='phone_main',
        ),
        migrations.RemoveField(
            model_name='company',
            name='post_code',
        ),
        migrations.RemoveField(
            model_name='company',
            name='street_addr1',
        ),
        migrations.RemoveField(
            model_name='company',
            name='street_addr2',
        ),
        migrations.AddField(
            model_name='company',
            name='company_address',
            field=models.ForeignKey(related_name='default_address', blank=True, to='authentication.Address', null=True),
            preserve_default=True,
        ),
    ]
