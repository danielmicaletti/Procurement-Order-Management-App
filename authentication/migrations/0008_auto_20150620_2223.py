# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import authentication.models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_company_company_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='company_logo',
            field=models.FileField(default=b'uploads/blank_co.png', null=True, upload_to=authentication.models.get_upload_file_name, blank=True),
            preserve_default=True,
        ),
    ]
