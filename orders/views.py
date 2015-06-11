from rest_framework import permissions, viewsets, generics
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import list_route, api_view, detail_route
from orders.models import Good, Detail, Order, ReqItem, ReqProduct, ReqFile, Offer, OfferItem
from authentication.models import Address
from orders.serializers import OrderSerializer, GoodSerializer, DetailSerializer, ReqItemSerializer, ReqProductSerializer, ReqFileSerializer, OfferSerializer, OfferItemSerializer
from operator import itemgetter, attrgetter
from django.utils import timezone
from datetime import date

class OrderViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def list(self, request, order_id=None):
        if self.request.user.optiz:
            queryset = Order.objects.all()
        else:
            queryset = self.queryset.filter(order_company=self.request.user.user_company)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save(order_created_by=self.request.user, order_company=self.request.user.user_company, order_status_change_date=timezone.now())
        print 'SeLF == %s' % self
        print "SER === %s" % serializer.data
        print "instance == %s" % instance
        return super(OrderViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        print 'UPD Self.req == %s' % self.request
        print 'UPD Self request data == %s' % self.request.data
        print 'UPD serial ==== %s' % serializer
        if serializer.is_valid():
            serializer.save(user=self.request.user, **self.request.data)

class ReqItemViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = ReqItem.objects.all()
    serializer_class = ReqItemSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        print 'Self data == %s' % self.request
        print 'Self reqit data == %s' % self.request.data
        print 'SERial ==== %s' % serializer
        if serializer.is_valid():
            user = self.request.user
            if self.request.data['add']:
                order_id = int(self.request.data['order_id'])
                print "ORDER ID === %s " % order_id
                order = Order.objects.get(id=order_id)
            else:
                order = Order.objects.create(order_created_by=self.request.user, order_company=self.request.user.user_company, order_status_change_date=timezone.now())
                print "orderid 1 === %s" %order.id
                yr = str(date.today().year)[2:]
                order.order_number = ''.join(["0",yr,str(order.id)])
                order.order_version = 00

            # print "ODRAFT 1 === %s" % self.request.data['order_draft']
            # if self.request.data['order_draft']:
                order.order_draft = True
                order.order_status = 'WRQ'
                order.company_approval_status = 'WRQ'
                order.optiz_status = 'WRQ'
            # else:
            #     if user.access_level >= '6':
            #         order.company_approval_status = 'PEN'
            #         order.order_status = 'PEN'
            #         order.optiz_status = 'PEN'
            #         order.company_approval_by = user
            #         order.company_approval_date = timezone.now()
            #     else:
            #         order.company_approval_status = 'APN'
            #         order.order_status = 'APN'
            #     order.order_version = order.order_version + 01
            order.save()
            serializer.save(order=order, **self.request.data)
            # return super(ReqItemViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        if serializer.is_valid(raise_exception=True):
            print 'SERial ==== %s' % serializer
            print 'Self reqit data == %s' % self.request.data
            print 'SERial 2 ==== %s' % serializer.validated_data
            user = self.request.user
            print "USER == %s" % user
            val_data = self.request.data['data']
            print "VAL_DATA == %s" % val_data
            order = Order.objects.get(id=val_data['order'])
            # print "ORDER === %s "% order.order_version
            # print "SRD === %s" % self.request.data
            # print "USER PROF === %s" % self.request.user.access_level
            # print "ODRAFT 1 === %s" % val_data['order_draft']
            # if val_data['order_draft']:
            #     order.order_status = 'WRQ'
            #     order.company_approval_status = 'WRQ'
            #     order.optiz_status = 'WRQ'
            #     order.order_version = 00
            # else:
            #     if user.access_level >= '6':
            #         order.company_approval_status = 'PEN'
            #         order.order_status = 'PEN'
            #         order.optiz_status = 'PEN'
            #         order.company_approval_by = user
            #         order.company_approval_date = timezone.now()
            #     else:
            #         order.company_approval_status = 'APN'
            #         order.order_status = 'APN'
            #     order.order_version = order.order_version + 01
            # order.save()
            serializer.save(order=order, **self.request.data)

class ReqProductViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = ReqProduct.objects.all()
    serializer_class = ReqProductSerializer

    def list(self, request, reqitem_id=None):
        queryset = self.queryset.filter(req_item=reqitem_id)
        serializer = ReqProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None, reqitem_id=None):
        queryset = self.queryset.get(id=id, req_item=reqitem_id)
        serializer = ReqProductSerializer(queryset)
        return Response(serializer.data)

class ReqFileViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = ReqFile.objects.all()
    serializer_class = ReqFileSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        print "SELF KWARGS == %s" % self.kwargs['reqitem_id']
        rqi = self.kwargs['reqitem_id']
        print 'Self reqFIL == %s' % self.request.data['file']
        r_file = self.request.data['file']
        print 'Self reqQP == %s' % self.request.query_params
        print 'SERi FIL ==== %s' % serializer
        print 'SERi FIL Data ==== %s' % serializer.context
        instance = serializer.save(req_item=ReqItem.objects.get(id=rqi), req_file=r_file)
        print "SER FIL === %s" % serializer.data
        print "instance  FIL== %s" % instance
        return super(ReqFileViewSet, self).perform_create(serializer)

class RequestViewSet(viewsets.ViewSet):
    queryset = ReqItem.objects.all()

    def list(self, request, order_id=None):
        queryset = self.queryset.filter(order=order_id)
        serializer = ReqItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, order_id=None):
        queryset = self.queryset.get(pk=pk, order=order_id)
        serializer = ReqItemSerializer(queryset)
        return Response(serializer.data)

class OfferViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def list(self, request, order_id=None):
        queryset = self.queryset.filter(order=order_id)
        serializer = OfferSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None, order_id=None):
        queryset = self.queryset.get(id=id, order=order_id)
        serializer = OfferSerializer(queryset)
        return Response(serializer.data)

    def perform_create(self, serializer):
        print 'Self data == %s' % self.request
        print 'Self request data == %s' % self.request.data
        print 'Serial ==== %s' % serializer
        if serializer.is_valid():
            print 'Serial 2 ==== %s' % serializer
            print 'Serial val_data ==== %s' % serializer.validated_data
            print 'Serial val_data ORDER ==== %s' % serializer.validated_data['order']
            print "USER PROF === %s" % self.request.user.access_level
            serializer.save(user=self.request.user, **self.request.data)
            # return super(OrderViewSet, self).perform_create(serializer)

class OfferItemViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = OfferItem.objects.all()
    serializer_class = OfferItemSerializer

    def retrieve(self, request, id=None):
        queryset = self.queryset.get(id=id)
        serializer = OfferItemSerializer(queryset)
        return Response(serializer.data)

class GoodViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Good.objects.all()
    serializer_class = GoodSerializer


class DetailViewSet(viewsets.ViewSet):
    lookup_field = 'good'
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer

    def list(self, request, good_id=None):
        queryset = self.queryset.filter(good=good_id)
        serializer = DetailSerializer(queryset, many=True)
        return Response(serializer.data)




