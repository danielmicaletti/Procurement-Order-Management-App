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
    created_by_username = serializers.CharField(source='created_by.username')
    created_by_first_name = serializers.CharField(source='created_by.first_name')
    created_by_last_name = serializers.CharField(source='created_by.last_name')
    created_by_pic = serializers.CharField(source='created_by.user_pic')

    class Meta:
        model = Comment
        fields = ('id', 'created_by', 'created_by_username', 'created_by_first_name', 'created_by_last_name', 'created_by_pic', 'order', 'body', 'created_date',)


class OfferItemSerializer(serializers.ModelSerializer):
    offer = serializers.CharField(required=False)

    class Meta:
        model = OfferItem
        fields = ('id', 'offer', 'item_name', 'item_details', 'price', 'item_sub_total', 'frequency', 'quantity',
            'delivery_date', 'date_start', 'date_end',)


class OfferSerializer(serializers.ModelSerializer):
    order = serializers.CharField(required=False)
    offer_item = OfferItemSerializer(many=True, required=False)
    offer_terms = serializers.CharField(required=False, allow_blank=True)
    offer_created_by = serializers.CharField(required=False)
    offer_created_by_name = serializers.CharField(source='offer_created_by.get_full_name', required=False)
    offer_approval_display = serializers.CharField(source='get_offer_approval_status_display', required=False)
    offer_approval_by = serializers.CharField(required=False)
    offer_approval_by_name = serializers.CharField(source='offer_approval_by.get_full_name', required=False)    

    class Meta:
        model = Offer
        fields = ('id', 'order', 'offer_version', 'offer_domain', 'offer_total', 'offer_terms',
            'offer_created', 'offer_created_by', 'offer_created_by_name', 'offer_approval_status', 'offer_approval_display', 'offer_approval', 'offer_approval_by', 'offer_approval_by_name', 'offer_item',)

    def create(self, validated_data):
        order = Order.objects.get(id=validated_data['order'])
        order.offer_version = order.offer_version+1
        order.order_version = order.order_version+1
        order.order_offer = True
        order.order_total = validated_data['offer_total']
        user = validated_data['user']
        order.modified_by = user
        order.order_status_change_by = user
        order.order_status = 'OFR'
        order.save()
        offer = Offer.objects.create(order=order, offer_version=order.offer_version, offer_created_by=user, offer_total=validated_data['offer_total'], offer_terms=validated_data['offer_terms'])
        offer.save()
        for item in validated_data['offer_item']:
            offer_item = OfferItem(offer=offer, **item)
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
    item_details = serializers.CharField(required=False)
    req_product = ReqProductSerializer(many=True, required=False)
    req_item_file = ReqFileSerializer(many=True, required=False)

    class Meta:
        model = ReqItem
        fields = ('id', 'good', 'order', 'order_draft', 'req_domain', 'item_fam', 'item_subfam', 'item_details', 'req_product', 'req_item_file',)

    def create(self, validated_data):
        order = validated_data.pop('order')
        goods = validated_data.pop('good')
        print "VALD === %s" % validated_data
        print "GOODS --- %s" % goods
        good = Good.objects.get(id=validated_data['good_id'])
        print "GOOD = %s" % good
        if 'item_details' in validated_data:
            item_details = validated_data.pop('item_details')
        else:
            item_details = ''
        order.order_draft = validated_data['order_draft']
        order.save()
        req_item = ReqItem.objects.create(order=order, good=good, req_domain=goods[0], item_fam=goods[1], item_subfam=goods[2], item_details=item_details)
        req_item.save()
        for k, v in validated_data['prod_details'].iteritems():
            req_product = ReqProduct(req_item=req_item, prod_fam=goods[1], prod_subfam=goods[2], prod_title=k, prod_details=v)
            req_product.save()
        return req_item

    def update(self, instance, validated_data):
        print "SELF --- %s" % self
        print "INST === %s" % instance
        print "Val_data === %s" % validated_data
        val_data = validated_data.pop('data')
        order = validated_data.pop('order')
        # addr = val_data['delivery_address']
        # del_address = Address.objects.get(id=addr)
        # order.delivery_address = del_address
        # order.reference_number = val_data['order_reference']
        # order.description = val_data['order_description'] 
        order.order_draft = val_data['order_draft'] 
        order.save()   
        instance.item_details = val_data.get('item_details', instance.item_details) 
        for item in val_data['req_product']:
            req_product = ReqProduct(id=item['id'], prod_title=item['prod_title'], prod_details=item['prod_details'], req_item=instance)
            req_product.save()
        instance.save()
        return instance


class OrderSerializer(serializers.ModelSerializer):
    order_company = CompanySerializer(read_only=True)
    order_created_by = UserCompanySerializer(read_only=True, required=False)
    company_approval_by = UserCompanySerializer(read_only=True, required=False)
    delivery_address = AddressSerializer(required=False, read_only=True)
    req_order = ReqItemSerializer(many=True, read_only=False, required=False)
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
        print "SELF --- %s" % self
        print "INST === %s" % instance.order_status
        print "Val_data === %s" % validated_data
        user = validated_data.pop('user')
        print "ORD SER USER === %s" % user
        if 'order_draft' in validated_data:
            if 'False' in validated_data['order_draft']:
                instance.order_draft = False
                print "INST VAL DATA OD --- %s" % instance.order_draft
                print "ORD SER USER LVL=== %s" % user.access_level
                if user.access_level >= '6':
                    instance.company_approval_status = 'PEN'
                    instance.order_status = 'PEN'
                    instance.optiz_status = 'PEN'
                    instance.company_approval_by = user
                    instance.company_approval_date = timezone.now()
                    instance.order_version = instance.order_version + 01
                else:
                    instance.company_approval_status = 'APN'
                    instance.order_status = 'APN'

        if 'order_status' in validated_data:
            instance.order_status = validated_data['order_status']
            instance.order_status_change_by = user
            instance.order_status_change_date = timezone.now()
            if 'optiz_status' in validated_data:
                instance.optiz_status = validated_data['optiz_status']
                instance.optiz_status_change_by = user
                instance.optiz_status_change_date = timezone.now()
            else: 
                instance.company_approval_status = validated_data['company_approval_status']
                instance.company_approval_by = user
                instance.company_approval_date = timezone.now()
            print 'VAL OD STAT avp?=== %s' % validated_data['order_status']
            if validated_data['order_status'] == 'APV' or validated_data['order_status'] == 'REF':
                offer = Offer.objects.get(id=validated_data['offer'])
                offer.offer_approval_status = validated_data['order_status']
                offer.offer_approval_by = user
                offer.offer_approval = timezone.now()
                offer.save()

        if 'delivery_address' in validated_data:
            addr = Address.objects.get(id=validated_data['delivery_address'])
            instance.delivery_address = addr

        if 'comment_body' in validated_data:
            comment = Comment.objects.create(order=instance, created_by=user, body=validated_data['comment_body'])

            comment.save()
        instance.reference_number = validated_data.get('reference_number', instance.reference_number)        
        instance.save()

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