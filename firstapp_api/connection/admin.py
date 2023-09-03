from django.contrib import admin
from .models import Tweet,TweetReply,Message

# Register your models here.
class TweetAdmin(admin.ModelAdmin):
    list_display = ['id','user','tweet','created_at']

class TweetReplyAdmin(admin.ModelAdmin):
    list_display = [field.name for field in TweetReply._meta.get_fields()]

class MessageAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Message._meta.get_fields()]

admin.site.register(Tweet,TweetAdmin)
admin.site.register(TweetReply,TweetReplyAdmin)
admin.site.register(Message,MessageAdmin)
