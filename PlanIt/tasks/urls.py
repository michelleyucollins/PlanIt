
from django.urls import path

from . import views

app_name = "tasks"
urlpatterns = [
    path("", views.index, name="tasks"),
    path("create_task/", views.create_task, name="create_task"),
    path("update_task/", views.update_task, name="update_task"),
    path("delete_task/", views.delete_task, name="delete_task"),
    # path("get_tasks/", views.get_tasks, name="get_tasks"),
]