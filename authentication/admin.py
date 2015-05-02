from django.contrib import admin
from authentication.models import Account, Company, Address, Activity

class AccountAdmin(admin.ModelAdmin):
   class Meta:
       model = Account
       
admin.site.register(Account, AccountAdmin)

class AccountInline(admin.StackedInline):
	model = Account
	extra = 0

class CompanyAdmin(admin.ModelAdmin):
	inlines = [
		AccountInline,
	]
	ordering = ['name']
       
admin.site.register(Company, CompanyAdmin)

class AddressAdmin(admin.ModelAdmin):
	class Meta:
		model = Address
       
admin.site.register(Address, AddressAdmin)

class ActivityAdmin(admin.ModelAdmin):
   class Meta:
       model = Activity
       
admin.site.register(Activity, ActivityAdmin)
