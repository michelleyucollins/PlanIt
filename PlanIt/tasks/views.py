import json
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Task, Event
from .forms import TaskForm

typeArr = ["School", "Clubs", "Work", "Personal"]

def index(request):
    task_list = Task.objects.order_by("created_date")
    school_tasks = Task.objects.filter(type="School").order_by("created_date")
    clubs_tasks = Task.objects.filter(type="Clubs").order_by("created_date")
    work_tasks = Task.objects.filter(type="Work").order_by("created_date")
    personal_tasks = Task.objects.filter(type="Personal").order_by("created_date")
    context = {"task_list": task_list, "school_tasks": school_tasks, "clubs_tasks": clubs_tasks, "work_tasks": work_tasks,
               "personal_tasks":personal_tasks}
    return render(request, "tasks/tasks.html", context)

def create_task(request):
    if request.method == 'POST':
        task_text = request.POST.get('text')
        category_index = request.POST.get('category')
        
        # Create a new task object and save it to the database.
        # Replace 'Task' with the actual name of your Task model.
        task = Task(
            title=category_index,
            type=typeArr[int(category_index)],
            subject='SomeSubject',
            categoryIndex=category_index,
            text=task_text
        )
        task.save()
        # Return the primary key (ID) of the newly created task in the response
        response_data = {
            'message': 'Task created successfully',
            'id': task.id  # Use the primary key as the ID
        }
        # updated_task_list = get_updated_task_list(category_index)
        # return JsonResponse({'message': 'Task created successfully', 'tasks': updated_task_list})
        return JsonResponse(response_data)
    return JsonResponse({'error': 'Invalid request method'})


# def get_updated_task_list(category_index):
#     tasks = Task.objects.filter(categoryIndex=category_index).values('text')
#     task_list = [task['text'] for task in tasks]
#     # You may want to format the task_list in the desired way before returning it.
#     return task_list

# def get_tasks(request):
#     if request.method == 'GET':
#         category_index = request.GET.get('category')
#         tasks = Task.objects.filter(categoryIndex=category_index).values('text').order_by("created_date")
#         task_list = [task['text'] for task in tasks]
#         # You may want to format the task_list in the desired way before sending it back.
#         return JsonResponse({'tasks': task_list})
#     return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def update_task(request):
    if request.method == 'POST':
        task_id = request.POST.get('id')  # Get the task ID
        updated_text = request.POST.get('text')  # Get the updated text

        try:
            task = Task.objects.get(id=task_id)
            task.text = updated_text
            task.save()
            return JsonResponse({'message': 'Task updated successfully'})
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_task(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            task_id = data.get('id')
            if task_id is not None:
                task = Task.objects.get(id=task_id)
                task.delete()
                return JsonResponse({'message': 'Task deleted successfully'})
            else:
                return JsonResponse({'error': 'Task ID not provided'})
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})
    return JsonResponse({'error': 'Invalid request method'})