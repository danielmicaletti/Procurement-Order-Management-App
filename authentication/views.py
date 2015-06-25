import json
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
# from authentication.permissions import IsAccountOwner
from django.utils import timezone
from ipware.ip import get_ip
from authentication.models import Account, Activity, Company, Address
from authentication.serializers import AccountSerializer, CompanySerializer, AddressSerializer

class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        # serializer = self.serializer_class(data=request.data)
        # print "SER --- %s" % serializer.data
        if serializer.is_valid():
            print "ser --- %s" % serializer.data
            print "SRD --- %s" % self.request.data['company']
            company = Company.objects.get(id=self.request.data['company'])
            print "COMPANY ==== %s" % company
            acct = Account.objects.create_user(**serializer.validated_data)
            acct.user_company = company
            acct.user_created_by = self.request.user
            acct.access_level = serializer.data['access_level']
            acct.position = serializer.data['position']
            acct.auth_amount = serializer.data['auth_amount']
            acct.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user, **self.request.data)

class CompanyViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        print "COMP SELF == %s" % self
        print "COMP Ser == %s" % serializer
        # serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Company.objects.create(**serializer.validated_data)
            user = self.request.user

            serializer.save(user=user, **self.request.data)

        #     return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        # return Response({
        #     'status': 'Bad request',
        #     'message': 'Company could not be created with received data.'
        # }, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        print "COMP SELf === %s" % self
        print "COMP SERIAL === %s" % serializer 
        if serializer.is_valid():
            serializer.save(user=self.request.user, **self.request.data)

class AddressViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        print "COMP SELf === %s" % self
        print "COMP SERIAL === %s" % serializer 
        serializer.save(addr_created_by=self.request.user)

class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)
        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = AccountSerializer(account)
                user = self.request.user
                ip = get_ip(request)
                obj, created = Activity.objects.get_or_create(active_user=user, user_login_date=timezone.now(), user_ip=ip)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)
        print "logout --- %s" % request
        return Response({}, status=status.HTTP_204_NO_CONTENT)
