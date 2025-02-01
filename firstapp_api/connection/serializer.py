from rest_framework import serializers
from .models import Tweet,TweetReply,Message,TweetLike,Notification
from authentication.models import User
from django.db.models import Count, Case, When, BooleanField, Subquery, OuterRef, Value, Q

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    firstname = serializers.SerializerMethodField()
    verified = serializers.SerializerMethodField()
    userimage = serializers.SerializerMethodField()
    is_like = serializers.BooleanField()
    is_dislike = serializers.BooleanField()

    class Meta:
        model = Tweet
        fields = ['id','tweet','user','firstname','username','userimage','image','verified','created_at','is_like','is_dislike']

    def get_username(self, obj):
        return obj.user.username

    def get_firstname(self, obj):
        return obj.user.first_name
    
    def get_userimage(self, obj):
        if obj.user.image:
            return obj.user.image.url
        return None

    def get_verified(self, obj):
        return True

class TweetSerializer_Post(serializers.ModelSerializer):
    
    class Meta:
        model = Tweet
        fields = '__all__'

class TweetReplySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    
    class Meta:
        model = TweetReply
        fields = ['id','reply','user','tweet','username','created_at']

    def get_username(self, obj):
        return obj.user.username

class MessageSerializer(serializers.ModelSerializer):
    #created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'format': '%Y-%m-%d %H:%M:%S'}  # Format the datetime field
        }

class TweetLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = TweetLike
        fields = ['id','user','tweet','is_like','is_dislike','created_at']

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ['id','user','from_user','message','notification_type','is_read','created_at']

class ProfileSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','image', 'posts_count', 'likes_count']

    def get_posts_count(self, obj):
        return obj.tweets.count()
    
    def get_likes_count(self, obj):
        TweetLike_data = TweetLike.objects.filter(Q(tweet__user=obj) & Q(is_like=True))
        return TweetLike_data.count()
