from django.contrib import admin
from messaging.models import Mail, MailReply, MailFile


class MailFileInline(admin.StackedInline):
    model = MailFile
    extra = 0

class MailReplyInline(admin.StackedInline):
    model = MailReply
    extra = 0

class MailAdmin(admin.ModelAdmin):

    inlines = [
        MailReplyInline,
        MailFileInline,
    ]
    list_display = ('mail_created', 'mail_created_by', 'subject',)
    list_filter = ('mail_created', 'mail_created_by',)
    ordering = ('-mail_created',)
    filter_horizontal = ()
        
admin.site.register(Mail, MailAdmin)
