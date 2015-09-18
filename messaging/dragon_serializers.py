from django.utils import timezone
from datetime import date
from swampdragon.serializers.model_serializer import ModelSerializer
from authentication.dragon_serializers import UserSerializer


class MailSerializer(ModelSerializer):
    mail_to = UserSerializer
    mail_created_by = UserSerializer
    reply_mail = 'messaging.MailReplySerializer'

    class Meta:
        model = 'messaging.Mail'
        publish_fields = ('subject', 'body', 'mail_draft', 'mail_read', 'mail_read_date', 'trash',
                        'mail_to', 'mail_created', 'mail_created_by', 'reply_mail',)
        update_fields = ('subject', 'body', 'mail_draft', 'mail_read', 'mail_read_date', 'trash',
                        'mail_to', 'mail_created', 'mail_created_by', 'reply_mail',)

class MailReplySerializer(ModelSerializer):
    orig_mail = 'messaging.MailSerializer'
    mail_to = UserSerializer
    reply_created_by = UserSerializer

    class Meta:
        model = 'messaging.MailReply'
        publish_fields = ('orig_mail', 'subject', 'body', 'reply_draft', 'reply_read_by', 'trash',
                        'mail_to', 'reply_created', 'reply_created_by', )

class EventLogSerializer(ModelSerializer):
    user = UserSerializer

    class Meta:
        model = 'eventlog.Log'
        publish_fields = ('id', 'timestamp', 'user', 'company', 'company_name', 'not_action', 'content_type', 'object_id',
                'notification', 'extra',)

class ChatSerializer(ModelSerializer):
    users = UserSerializer
    # chat_message_user = UserSerializer

    # def serialize_chat_group(self, obj):
    #     print "cm dr self == %s" %self
    #     print "cm dr obj == %s" %obj
    #     return '{}'.format(obj.users)

    class Meta:
        model = 'messaging.Chat'
        publish_fields = ('id', 'users',)

class ChatMessageSerializer(ModelSerializer):
    # chat_group = 'ChatSerializer'
    # chat_users = 'ChatSerializer'
    chat = ChatSerializer
    user = UserSerializer

    # def serialize_chat(self, obj, serializer):
    #     print "cm dr self == %s" %self
    #     print "cm dr obj == %s" %obj
    #     print "cm dr serializer == %s" %serializer
    #     return '{} {}'.format(obj.id, obj.users)

    class Meta:
        model = 'messaging.ChatMessage'
        publish_fields = ('id', 'chat', 'user', 'chat_message','chat_message_created',)

