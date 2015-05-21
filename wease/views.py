from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from orders.models import Good
from authentication.models import Activity
from django.utils.decorators import method_decorator
# from django.contrib import auth
from django.utils import timezone
from ipware.ip import get_ip




class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
    	user = self.request.user
    	if user is not None and user.is_active:
	        ip = get_ip(self.request)
	        # obj, created = Activity.objects.get_or_create(active_user=user, user_login_date=timezone.now(), user_ip=ip)
        return super(IndexView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['goods'] = Good.objects.all()
        return context

    def set_ip(self):
    	print "USER == %s" % self.request.user
    	# if user is not None and user.is_active:
	    #     ip = get_ip(request)
	    #     obj, created = Activity.objects.get_or_create(active_user=user, user_login_date=timezone.now(), user_ip=ip)
