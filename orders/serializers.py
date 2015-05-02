from django.forms import widgets
from django.utils import timezone
from rest_framework import serializers
from rest_framework.parsers import JSONParser
import json
from collections import *
from authentication.models import Account, Company, Address
from orders.models import Order, ReqItem, ReqProduct, ReqFile, Offer, OfferItem, Comment, Good, Detail
from authentication.serializers import AccountSerializer, UserCompanySerializer, CompanySerializer, AddressSerializer

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'created_by', 'order', 'body', 'created_date',)


class OfferItemSerializer(serializers.ModelSerializer):
    offer = serializers.CharField(required=False)

    class Meta:
        model = OfferItem
        fields = ('id', 'offer', 'item_name', 'item_details', 'price', 'item_sub_total', 'frequency', 'quantity',
            'delivery_date', 'date_start', 'date_end',)


class OfferSerializer(serializers.ModelSerializer):
    order = serializers.CharField(required=False)
    offer_item = OfferItemSerializer(many=True, required=False)
    offer_created_by = serializers.CharField(required=False)
    offer_created_by_name = serializers.CharField(source='offer_created_by.get_full_name', required=False)
    offer_approval_by = serializers.CharField(required=False)
    offer_approval_by_name = serializers.CharField(source='offer_approval_by.get_full_name', required=False)    

    class Meta:
        model = Offer
        fields = ('id', 'order', 'offer_version', 'offer_domain', 'offer_total', 'offer_terms',
            'offer_created', 'offer_created_by', 'offer_created_by_name', 'offer_approval', 'offer_approval_by', 'offer_approval_by_name', 'offer_item',)

    def create(self, validated_data):
        print "SELF === %s" % self
        print "VAL DATA === %s" % validated_data
        print "VAL DATA ORDER === %s" % validated_data['order']
        order = Order.objects.get(id=validated_data['order'])
        print "Ord version == %s" % order.offer_version
        order.offer_version = order.offer_version+1
        print "Ord version 2== %s" % order.offer_version
        order.order_offer = True
        order.order_total = validated_data['offer_total']
        print "Ord Total === %s" % order.order_total
        user = validated_data['user']
        order.modified_by = user
        order.order_status_change_by = user
        order.order_status = 'OFR'
        order.save()
        offer = Offer.objects.create(order=order, offer_version=order.offer_version, offer_created_by=user, offer_total=validated_data['offer_total'], offer_terms=validated_data['offer_terms'])
        offer.save()
        for item in validated_data['offer_item']:
            offer_item = OfferItem(offer=offer, **item)
            print "ITEM === %s" % item
            offer_item.save()
        return offer


class ReqFileSerializer(serializers.ModelSerializer):
    req_item = serializers.CharField(required=False)

    class Meta:
        model = ReqFile
        fields = ('id', 'req_item', 'file_created', 'req_file',)


class ReqProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReqProduct
        fields = ('id', 'req_item', 'prod_fam', 'prod_subfam', 'prod_title', 'prod_details', 'prod_description',)

class ReqItemSerializer(serializers.ModelSerializer):
    good = serializers.CharField(source='good.id', required=False)
    order = serializers.CharField(required=False)
    order_draft = serializers.BooleanField(source='order.order_draft', required=False)
    order_description = serializers.CharField(source='order.description', read_only=True, required=False)
    order_reference = serializers.CharField(source='order.reference_number', read_only=True, required=False)
    delivery_address = serializers.IntegerField(source='order.delivery_address.id', read_only=True, required=False)
    req_product = ReqProductSerializer(many=True, required=False)
    req_item_file = ReqFileSerializer(many=True, required=False)

    class Meta:
        model = ReqItem
        fields = ('id', 'good', 'order', 'order_draft', 'order_description', 'delivery_address', 'order_reference', 'req_domain', 'item_fam', 'item_subfam', 'req_product', 'req_item_file',)

    def create(self, validated_data):
        print "SELF == =%s" % self
        print "VAL_DATA === %s" % validated_data
        order = validated_data.pop('order')
        print "Order === %s" % order
        goods = validated_data.pop('good')
        good = Good.objects.get(id=validated_data['good_id'])
        print "GOOD === %s" % good
        addr = Address.objects.get(id=validated_data['delivery_address'])
        order.delivery_address = addr
        order.reference_number = validated_data['order_reference']
        order.description = validated_data['order_description'] 
        order.order_draft = validated_data['order_draft']
        print "ORDER DA == %s" % order.delivery_address
        order.save()
        print "ORDER SV 2 == %s" % order
        req_item = ReqItem.objects.create(order=order, good=good, req_domain=goods[0], item_fam=goods[1], item_subfam=goods[2])
        req_item.save()
        for k, v in validated_data['prod_details'].iteritems():
            print "K === %s" % k
            print "V === %s" % v
            req_product = ReqProduct(req_item=req_item, prod_fam=goods[1], prod_subfam=goods[2], prod_title=k, prod_details=v)
            print "REQ PRODUCT 1 === %s" % req_product
            req_product.save()
        print "req_item === %s " % req_item
        return req_item

    def update(self, instance, validated_data):
        print "UPD RQ SELF=== %s" % self
        print "UPD RQ INST === %s" % instance
        print "UPD RQ VAL ==== %s" % validated_data
        val_data = validated_data.pop('data')
        print "VAL DATA === %s" % val_data
        order = validated_data.pop('order')
        print "Order === %s" % order
        addr = val_data['delivery_address']
        print "ADDR === %s " % addr
        del_address = Address.objects.get(id=addr)
        print "del_address === %s "% del_address
        order.delivery_address = del_address
        order.reference_number = val_data['order_reference']
        order.description = val_data['order_description'] 
        order.order_draft = val_data['order_draft'] 
        order.save()      
        for item in val_data['req_product']:
            print "ITEM === %s" % item
            req_product = ReqProduct(id=item['id'], prod_title=item['prod_title'], prod_details=item['prod_details'], req_item=instance)
            print "REQ PRODUCT 1 === %s" % req_product
            req_product.save()
            print "REQ PRODUCT 2 === %s" % req_product
        print "UPD SELF 2 === %s" % self
        print "UPD instance 2 === %s" % instance
        print "UPD validated_data 2 ==== %s" % validated_data
        instance.save()
        return instance

class OrderSerializer(serializers.ModelSerializer):
    order_company = CompanySerializer(read_only=True)
    order_created_by = UserCompanySerializer(read_only=True, required=False)
    company_approval_by = UserCompanySerializer(required=False)
    delivery_address = AddressSerializer(required=False)
    req_order = ReqItemSerializer(many=True, read_only=True)
    offer_order = OfferSerializer(many=True, read_only=True)
    order_comment = CommentSerializer(many=True, required=False)
    order_status_change_date = serializers.DateTimeField(required=False)
    order_status_display = serializers.CharField(source='get_order_status_display', required=False)
    company_approval_status_display = serializers.CharField(source='get_company_approval_status_display', required=False)
    optiz_status_display = serializers.CharField(source='get_optiz_status_display', required=False)

    class Meta:
        model = Order
        fields = ('id', 'order_company', 'order_draft', 'order_number', 'order_version', 'offer_version', 'order_offer', 'reference_number',
            'description', 'order_total', 'delivery_address', 'order_created', 'order_created_by', 'modified_by', 'modified_by_date', 'order_status',
            'order_status_display', 'order_status_change_by', 'order_status_change_date', 'company_approval_status', 'company_approval_status_display','company_approval_by', 'company_approval_date',
            'optiz_status', 'optiz_status_display','optiz_status_change_by', 'optiz_status_change_date', 'req_order', 'offer_order', 'order_comment',)
        read_only_fields = ('order_created', 'modified_date', 'company_approval_by', 'optiz_status_change_by', 'order_status_change_by', 'modified_by',)
    
    def update(self, instance, validated_data):
        print "SER UPD SELF === %s" % self
        print "SER UPD INST === %s" % instance
        print "SER UPD VAL DATA === %s" % validated_data
        instance.order_status = validated_data['order_status']
        instance.order_status_change_by = validated_data['user']
        instance.order_status_change_date = timezone.now()
        instance.company_approval_status = validated_data['company_approval_status']
        instance.company_approval_by = validated_data['user']
        instance.company_approval_date = timezone.now()        
        instance.save()

        if 'APV' or 'REF' in validated_data['order_status']:
            offer = Offer.objects.get(id=validated_data['offer'])
            offer.offer_approval_by = validated_data['user']
            offer.offer_approval = timezone.now()
            offer.save()
        return instance

class DetailSerializer(serializers.ModelSerializer):
    good = serializers.CharField()

    class Meta:
        model = Detail
        fields = ('id', 'good', 'good_info', 'good_description',)

class GoodSerializer(serializers.ModelSerializer):
    good_detail = DetailSerializer(many=True)

    class Meta:
        model = Good
        fields = ('id', 'domain', 'family', 'subfamily', 'good_detail', )