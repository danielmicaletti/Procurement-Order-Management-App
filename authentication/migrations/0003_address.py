# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20150305_2352'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('addr_type', models.CharField(default=b'OFF', max_length=3, choices=[(b'OFF', b'Office'), (b'DEL', b'Delivery'), (b'OTH', b'Other')])),
                ('addr_location', models.CharField(max_length=50, null=True, blank=True)),
                ('street_addr1', models.CharField(max_length=50, null=True, blank=True)),
                ('street_addr2', models.CharField(max_length=50, null=True, blank=True)),
                ('city', models.CharField(max_length=50, null=True, blank=True)),
                ('post_code', models.CharField(max_length=10, null=True, blank=True)),
                ('country', models.CharField(max_length=50, null=True, blank=True)),
                ('phone_main', models.CharField(max_length=30, null=True, blank=True)),
                ('addr_notes', models.TextField(null=True, blank=True)),
                ('addr_created_date', models.DateTimeField(auto_now_add=True)),
                ('addr_updated_date', models.DateTimeField(auto_now=True)),
                ('addr_company', models.ForeignKey(related_name='address_company', blank=True, to='authentication.Company', null=True)),
                ('addr_created_by', models.ForeignKey(related_name='address_created_user', to=settings.AUTH_USER_MODEL)),
                ('addr_updated_by', models.ForeignKey(related_name='address_updated_user', to=settings.AUTH_USER_MODEL)),
                ('addr_user', models.ForeignKey(related_name='address_user', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
