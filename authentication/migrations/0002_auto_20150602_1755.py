# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import authentication.models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='user_pic',
            field=models.FileField(default=b'uploads/blank_user.png', null=True, upload_to=authentication.models.get_upload_file_name, blank=True),
            preserve_default=True,
        ),
    ]
