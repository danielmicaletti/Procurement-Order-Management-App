# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='offer_approval_status',
            field=models.CharField(default=b'WAP', max_length=3, choices=[(b'REF', b'Refus\xc3\xa9'), (b'APV', b'Approuv\xc3\xa9'), (b'WAP', b'Waiting Approval')]),
            preserve_default=True,
        ),
    ]
