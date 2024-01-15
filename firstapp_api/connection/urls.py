from django.urls import path, include
from .views import TweetAPIView,TweetReplyAPIView,MessageAPIView,TweetCountAPIView


app_name = 'connections'

urlpatterns = [
    path('tweet/', TweetAPIView, name='tweet'),
    path('message/<int:pk>/', MessageAPIView, name='message'),
    path('reply/<int:pk>/', TweetReplyAPIView, name='reply'),
    path('tweetcount/', TweetCountAPIView, name='tweetcount'),
    
]