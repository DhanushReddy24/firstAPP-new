from django.db import models
from authentication.models import User

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/connection/tweet/',null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tweet

class TweetReply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    reply = models.CharField(max_length=255)
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

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE,default=-1)
    is_like = models.BooleanField(default=False)
    is_dislike = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tweet.tweet

class Notification(models.Model):

    NOTIFICATION_TYPE_CHOICES = [
        ('TL', 'Tweet Like'),
        ('CM', 'Chat Message'),
        ('F', 'Follow'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=-1, related_name='notification_receiver')
    from_user = models.ForeignKey(User, on_delete=models.CASCADE,default=-1, related_name='notification_sender')
    message = models.CharField(max_length=255)
    notification_type = models.CharField(max_length=5, choices=NOTIFICATION_TYPE_CHOICES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.message