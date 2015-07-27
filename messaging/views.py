import json
from django.db.models import Q
from rest_framework import permissions, status, viewsets, generics
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import list_route, api_view, detail_route
from eventlog.models import Log, log
from messaging.models import Mail
from messaging.serializers import LogSerializer, MailSerializer
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
    lookup_field = 'id'
    queryset = Log.objects.filter(notification=True)
    serializer_class = LogSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def list(self, request, notification=None):
        if self.request.user.optiz:
            queryset = self.queryset.filter(company__company_assigned_to=self.request.user).exclude(viewed_by=self.request.user)
        else:
            queryset = self.queryset.filter(company=self.request.user.user_company).exclude(viewed_by=self.request.user)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None):      
        queryset = self.queryset.filter(id=id, notification=True)
        serializer = LogSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user, **self.request.data)

class MailViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Mail.objects.all()
    serializer_class = MailSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def list(self, request, mail=None):
        queryset = self.queryset.filter(Q(mail_to=self.request.user) | Q(mail_created_by=self.request.user))
        print "MAILS QS ==== %s" % queryset
        serializer = MailSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None):      
        queryset = self.queryset.filter(id=id)
        serializer = MailSerializer(queryset)
        return Response(serializer.data)

