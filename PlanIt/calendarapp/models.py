import datetime

from django.db import models
from django.utils import timezone

class Task(models.Model):
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def create(self):
        self.save()

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    date = models.DateTimeField(blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title