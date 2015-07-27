from django.db import models
from django.utils import timezone
from django.utils.encoding import smart_unicode
from authentication.models import Account, Company, Address, get_upload_file_name
from time import time
from wease import settings


class Mail(models.Model):
    subject = models.CharField(max_length=250, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    mail_draft = models.BooleanField(default=False)
    mail_read = models.BooleanField(default=False)
    mail_read_date = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    mail_read_by = models.ManyToManyField(Account, related_name='mail_read_by', null=True, blank=True)
    trash = models.ManyToManyField(Account, related_name='mail_trash_by', null=True, blank=True)
    mail_to = models.ManyToManyField(Account, related_name='mail_sent_to', null=True, blank=True)
    mail_created_by = models.ForeignKey(Account, related_name='mail_created_by_user')
    mail_created = models.DateTimeField(auto_now_add=False, auto_now=True)
    
    def __unicode__(self):
        return smart_unicode(self.subject, self.mail_created_by)
    
        
class MailReply(models.Model):
    orig_mail = models.ForeignKey(Mail, related_name='reply_mail')
    subject = models.CharField(max_length=250, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    reply_draft = models.BooleanField(default=False)    
    reply_read_by = models.ManyToManyField(Account, related_name='reply_read_by', null=True, blank=True)
    reply_read_date = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    trash = models.ManyToManyField(Account, related_name='reply_trash_by', null=True, blank=True)
    mail_to = models.ManyToManyField(Account, related_name='reply_sent_to', null=True, blank=True)
    reply_created_by = models.ForeignKey(Account, related_name='reply_created_by_user')
    reply_created = models.DateTimeField(auto_now_add=False, auto_now=True)
    
    def __unicode__(self):
        return smart_unicode(self.orig_mail, self.reply_created_by)
    
class MailFile(models.Model):
    base_mail = models.ForeignKey(Mail, related_name='base_files', blank=True, null=True)
    reply_mail = models.ForeignKey(MailReply, related_name='reply_files', blank=True, null=True)
    file_created = models.DateTimeField(auto_now=True)
    mail_file = models.FileField(upload_to=get_upload_file_name, null=True, blank=True)