# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0003_chat_chatmessage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chatmessage',
            options={'ordering': ['-chat_message_created']},
        ),
        migrations.RenameField(
            model_name='chatmessage',
            old_name='chat_created',
            new_name='chat_message_created',
        ),
    ]
