from django.conf.urls import include, patterns, url
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_nested import routers

from authentication.views import AccountViewSet, CompanyViewSet, AddressViewSet, LoginView, LogoutView
# from posts.views import AccountPostsViewSet, PostViewSet
from orders.views import OrderViewSet, GoodViewSet, DetailViewSet, RequestViewSet, ReqItemViewSet, ReqProductViewSet, ReqFileViewSet, OfferViewSet
from wease.views import IndexView

from django.contrib import admin

admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'req-items', ReqItemViewSet)
router.register(r'offers', OfferViewSet)
router.register(r'goods', GoodViewSet)
# router.register(r'details', DetailViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account',
)
accounts_router = routers.NestedSimpleRouter(
    router, r'companies', lookup='company',
)
accounts_router = routers.NestedSimpleRouter(
    router, r'addresses', lookup='address',
)
goods_router = routers.NestedSimpleRouter(
    router, r'goods', lookup='good',
)
orders_router = routers.NestedSimpleRouter(
    router, r'orders', lookup='order',
)
req_router = routers.NestedSimpleRouter(
    router, r'req-items', lookup='reqitem',
)
offer_router = routers.NestedSimpleRouter(
    router, r'offers', lookup='offer',
)
orders_router.register(r'requests', RequestViewSet)
orders_router.register(r'offers', OfferViewSet)
req_router.register(r'req-prods', ReqProductViewSet)
req_router.register(r'req-files', ReqFileViewSet)
goods_router.register(r'details', DetailViewSet)
# accounts_router.register(r'goods', GoodViewSet)


urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/', include(goods_router.urls)),
    url(r'^api/v1/', include(orders_router.urls)),
    url(r'^api/v1/', include(req_router.urls)),    
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    # url(r'^app/.*$', IndexView.as_view(), name='index'),

    url(r'^$',  IndexView.as_view(), name='index'),    
    url(r'^/$',  IndexView.as_view(), name='index'),

    url(r'^admin/', include(admin.site.urls)),
)

# if settings.DEBUG:
#    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
   
    urlpatterns += staticfiles_urlpatterns()
