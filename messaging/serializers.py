from django.utils import timezone
from datetime import date
from rest_framework import serializers
from rest_framework.parsers import JSONParser
import json
from eventlog.models import Log
from messaging.models import Mail, MailReply, MailFile
from authentication.models import Company
from authentication.serializers import UserCompanySerializer
from orders.serializers import OrderSerializer


class LogSerializer(serializers.ModelSerializer):
    user = UserCompanySerializer()
    company_name = serializers.CharField(source='company.name', required=False)
    action = serializers.CharField(required=False)
    content_type = serializers.StringRelatedField(required=False) 

    class Meta:
        model = Log
        fields = ('id', 'timestamp', 'user', 'company', 'company_name', 'action', 'content_type', 'object_id',
				'notification', 'extra',)

    def update(self, instance, validated_data):
        user = validated_data.pop('user')
        instance.viewed_by.add(user)
        instance.save()

        return instance


class MailFileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MailFile
        fields = ('base_mail', 'reply_mail', 'file_created', 'mail_file',)


class MailReplySerializer(serializers.ModelSerializer):
    reply_files = MailFileSerializer(required=False, many=True)


    class Meta:
        model = MailReply
        fields = ('id', 'orig_mail', 'subject', 'body', 'reply_draft', 'reply_read', 'reply_read_date', 'reply_read_by',
                'trash', 'mail_to', 'reply_created_by', 'reply_created', 'reply_files',)

class MailSerializer(serializers.ModelSerializer):
    replies = MailReplySerializer(required=False, many=True)
    base_files = MailFileSerializer(required=False, many=True)
    mail_read_by = UserCompanySerializer(required=False, many=True)
    trash = UserCompanySerializer(required=False, many=True)
    mail_to = UserCompanySerializer(required=False, many=True)
    mail_created_by = UserCompanySerializer(required=False)

    class Meta:
        model = Mail
        fields = ('id', 'subject', 'body', 'mail_draft', 'mail_read', 'mail_read_date', 'mail_read_by', 'trash', 'mail_to',
                'mail_created_by', 'mail_created', 'replies', 'base_files',)

