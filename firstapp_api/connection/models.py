from django.db import models
from authentication.models import User

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/connection/tweet/',null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tweet

class TweetReply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    reply = models.CharField(max_length=200, default='')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reply

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1,related_name='sender')
    opp_user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1,related_name='receiver')
    message = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message
