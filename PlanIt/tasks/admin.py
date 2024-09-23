from django.contrib import admin

from .models import Task, Event

admin.site.register(Task)
admin.site.register(Event)
