from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from .models import Task, Event


def index(request):
    latest_question_list = Task.objects.order_by("-created_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "calendarapp/calendar.html", context)

def detail(request):
    latest_question_list = Task.objects.order_by("-created_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "calendarapp/newEvent.html", context)

def d(request, question_id):
    question = get_object_or_404(Task, pk=question_id)
    return render(request, "calendarapp/newEvent.html", {"question": question})


def results(request, question_id):
    return HttpResponse("You're looking at the results of question %s." % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)