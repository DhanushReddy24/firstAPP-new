from django.db import models

class Sample_1(models.Model):
    username = models.CharField(max_length=200)
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    age = models.IntegerField()
    address = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.firstname

class Sample_2(models.Model):
    user = models.ForeignKey(Sample_1, on_delete=models.CASCADE)
    tweet = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tweet