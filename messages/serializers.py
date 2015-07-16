from django.utils import timezone
from datetime import date
from rest_framework import serializers
from rest_framework.parsers import JSONParser
import json
from eventlog.models import Log
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