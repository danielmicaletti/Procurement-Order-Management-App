import json
from rest_framework import permissions, status, viewsets, generics
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import list_route, api_view, detail_route
from eventlog.models import Log, log
from messages.serializers import LogSerializer
from django.utils import timezone
from datetime import date

class OrderActivityViewSet(viewsets.ModelViewSet):
    lookup_field = 'object_id'
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def list(self, request, logs=None):
        queryset = self.queryset.filter(content_type=11)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None, object_id=None):      
        queryset = self.queryset.filter(object_id=object_id)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

class NotificationViewSet(viewsets.ModelViewSet):
    lookup_field = 'company_id'
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def list(self, request, notification=None):
        if self.request.user.optiz:
            queryset = self.queryset.filter(notification=True)
        else:
            queryset = self.queryset.filter(company=self.request.user.user_company, notification=True)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None, company_id=None):      
        queryset = self.queryset.filter(company_id=company_id, notification=True)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)