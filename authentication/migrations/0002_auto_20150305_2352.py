# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import authentication.models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_login_date', models.DateTimeField(null=True, blank=True)),
                ('user_ip', models.CharField(max_length=45, null=True, blank=True)),
                ('active_user', models.ForeignKey(related_name='active_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, null=True, blank=True)),
                ('street_addr1', models.CharField(max_length=50, null=True, blank=True)),
                ('street_addr2', models.CharField(max_length=50, null=True, blank=True)),
                ('city', models.CharField(max_length=50, null=True, blank=True)),
                ('post_code', models.CharField(max_length=10, null=True, blank=True)),
                ('country', models.CharField(max_length=50, null=True, blank=True)),
                ('phone_main', models.CharField(max_length=30, null=True, blank=True)),
                ('company_logo', models.FileField(null=True, upload_to=authentication.models.get_upload_file_name, blank=True)),
                ('company_created', models.DateTimeField(auto_now_add=True)),
                ('company_updated', models.DateTimeField(auto_now=True)),
                ('company_assigned_to', models.ManyToManyField(related_name='assigned_to', null=True, to=settings.AUTH_USER_MODEL, blank=True)),
                ('company_created_by', models.ForeignKey(related_name='created_company', to=settings.AUTH_USER_MODEL)),
                ('company_updated_by', models.ForeignKey(related_name='updated_company', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RenameField(
            model_name='account',
            old_name='created_at',
            new_name='user_created',
        ),
        migrations.RenameField(
            model_name='account',
            old_name='updated_at',
            new_name='user_updated',
        ),
        migrations.AddField(
            model_name='account',
            name='access_level',
            field=models.CharField(default=b'2', max_length=2, choices=[(b'9', b'Super'), (b'8', b'Administrator'), (b'7', b'Manager'), (b'6', b'Approve'), (b'5', b'Submit'), (b'2', b'View')]),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='approval_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='auth_amount',
            field=models.CharField(default=0, max_length=7, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='canceled_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='city',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='country',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='info_change_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='lang',
            field=models.CharField(default=b'fr', max_length=3, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='new_user_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='offer_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='optiz',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='order_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='phone_main',
            field=models.CharField(max_length=30, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='phone_mobile',
            field=models.CharField(max_length=30, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='position',
            field=models.CharField(max_length=120, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='post_code',
            field=models.CharField(max_length=10, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='refused_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='request_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='street_addr1',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='street_addr2',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='user_company',
            field=models.ForeignKey(related_name='wease_company', blank=True, to='authentication.Company', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='user_created_by',
            field=models.ForeignKey(related_name='created_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='user_pic',
            field=models.FileField(null=True, upload_to=authentication.models.get_upload_file_name, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='user_updated_by',
            field=models.ForeignKey(related_name='updated_user', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='account',
            name='validated_email',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
