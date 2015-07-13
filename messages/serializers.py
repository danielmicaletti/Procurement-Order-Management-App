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
    company_name = serializers.CharField(source='company.name')
    content_type = serializers.StringRelatedField() 

    class Meta:
        model = Log
        fields = ('id', 'timestamp', 'user', 'company', 'company_name', 'action', 'content_type', 'object_id', 'extra',)