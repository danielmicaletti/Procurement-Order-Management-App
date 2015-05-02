from django.contrib import admin
from orders.models import Order, Comment, ReqItem, ReqProduct, ReqFile, Offer, OfferItem, Good, Detail

class DetailInline(admin.StackedInline):
    model = Detail
    extra = 0

class OptizAdmin(admin.ModelAdmin):

    inlines = [
        DetailInline,
    ]
    ordering = ['domain']

admin.site.register(Good, OptizAdmin)

class ReqItemInline(admin.StackedInline):
    model = ReqItem
    extra = 0

class ReqProdInline(admin.StackedInline):
    model = ReqProduct
    extra = 0

class OfferInline(admin.StackedInline):
    model = Offer
    extra = 0

class OfferItemInline(admin.StackedInline):
    model = OfferItem
    extra = 0

class ReqFileInline(admin.StackedInline):
    model = ReqFile
    extra = 0

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 0

class OrderAdmin(admin.ModelAdmin):

    inlines = [
        ReqItemInline,
        OfferInline,
        CommentInline,
    ]
    # ordering = ['domain']
        
admin.site.register(Order, OrderAdmin)

class ReqItemAdmin(admin.ModelAdmin):

    inlines = [
        ReqProdInline,
        ReqFileInline,
    ]
        
admin.site.register(ReqItem, ReqItemAdmin)

class ReqFileAdmin(admin.ModelAdmin):
    class Meta:
        model = ReqFile
        
admin.site.register(ReqFile, ReqFileAdmin)

class OfferAdmin(admin.ModelAdmin):

    inlines = [
        OfferItemInline,
    ]

admin.site.register(Offer, OfferAdmin)

