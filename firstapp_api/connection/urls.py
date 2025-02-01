from django.urls import path, include
from .views import TweetAPIView, TweetDeleteAPIView, TweetReplyAPIView,MessageAPIView,TweetCountAPIView,TweetLikeAPIView, TweetLikeCountAPIView, NotificationAPIView, NotificationCountAPIView, ProfileAPIView, UserTweetStatsAPIView


app_name = 'connections'

urlpatterns = [
    path('tweet/', TweetAPIView, name='tweet'),
    path('tweet/<int:user>/', TweetAPIView, name='tweet'),
    path('tweetdelete/<int:pk>/', TweetDeleteAPIView, name='tweetdelete'),
    path('message/<int:pk>/', MessageAPIView, name='message'),
    path('reply/<int:pk>/', TweetReplyAPIView, name='reply'),
    path('tweetcount/', TweetCountAPIView, name='tweetcount'),
    path('tweetlike/', TweetLikeAPIView, name='tweetlike'),
    path('tweetlikecount/', TweetLikeCountAPIView, name='tweetlike'),
    path('notification/', NotificationAPIView, name='notification'),
    path('notificationcount/', NotificationCountAPIView, name='notificationcount'),
    path('profile/<int:user>', ProfileAPIView, name='profile'),
    path('usertweetstats/<int:user>/', UserTweetStatsAPIView, name='usertweetstats'),
]