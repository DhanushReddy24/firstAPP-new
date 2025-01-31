from django.db import models
from authentication.models import User

class Job(models.Model):
    title = models.CharField(max_length=255, blank=False)
    company = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=False)
    jobType = models.CharField(max_length=255, blank=False)
    location = models.CharField(max_length=255, blank=False)
    salary = models.IntegerField(blank=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + self.company
