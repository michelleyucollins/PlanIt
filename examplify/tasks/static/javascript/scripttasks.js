// Get references to HTML elements
const newTaskInput1 = document.getElementById('new-task1');
// const addTaskButton = document.getElementById('add-task');
const taskList1 = document.getElementById('tasks1');
const newTaskInput2 = document.getElementById('new-task2');
const taskList2 = document.getElementById('tasks2');
const newTaskInput3 = document.getElementById('new-task3');
const taskList3 = document.getElementById('tasks3');
const newTaskInput4 = document.getElementById('new-task4');
const taskList4 = document.getElementById('tasks4');

const ctasks1 = document.querySelectorAll('#tasks1 div');
const ctasks2 = document.querySelectorAll('#tasks2 div');
const ctasks3 = document.querySelectorAll('#tasks3 div');
const ctasks4 = document.querySelectorAll('#tasks4 div');

const colorarr = [["#B9E1EE", "#71BDCE", "#398799"], ['#D3D1EF', '#BAB6E7', '#5F59A1'],['#F5D4EC', '#F1B1DF', '#94497F'],['#FADDC2', '#F8C08D', '#B37841']]

/*task editors*/
// Function to add a new task
function addNewTask(taskInput, taskList, tasknum) {
    const taskText = taskInput.value.trim();
    let n = tasknum-1;
    if (taskText !== '') {
        // Get the CSRF token
        const csrftoken = getCSRFToken();

        // Make an AJAX request to create a new task
        $.ajax({
            type: 'POST',
            url: '/tasks/create_task/',
            data: {
                text: taskText,
                category: n
            },
            headers: {
                'X-CSRFToken': csrftoken  // Include the CSRF token in the request headers
            },
            success: function (data) {
                const newTaskId = data.id;

                const div = document.createElement('div');
                div.setAttribute('data-task-id', newTaskId);
                const p = document.createElement('p');
                p.textContent = taskText;
                let { bg, txt } = getRandomColor(colorarr[n][0], colorarr[n][1], colorarr[n][2]);
                div.style.background = bg;
                div.style.color = txt;
                div.appendChild(p);
                taskList.appendChild(div);
                taskInput.value = '';
            },
            error: function (xhr, errmsg, err) {
                // Handle errors.
            }
        });
    }
}

// Function to get the CSRF token from the cookies
function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('csrftoken='));
    if (cookieValue) {
        return cookieValue.split('=')[1];
    }
    return '';
}

function saveTaskToDjango(taskText, categoryIndex) {
    // Get the CSRF token
    const csrftoken = getCSRFToken();
    // Make an AJAX request to your Django view to save the task data.
    $.ajax({
        type: 'POST',
        url: '/tasks/create_task/',  // Replace with the actual URL.
        data: {
            text: taskText,
            category: categoryIndex  // Send the category index to your Django view.
        },
        headers: {
            'X-CSRFToken': csrftoken  // Include the CSRF token in the request headers
        },
        success: function (data) {
            // Handle success (e.g., update the frontend task list if needed).
        },
        error: function (xhr, errmsg, err) {
            // Handle errors.
        }
    });
}

// Double-click event to toggle task editing
taskList1.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.contentEditable = true;
        target.focus();
    }
});

// Keydown event to save changes on Enter and delete the task on empty text
taskList1.addEventListener('keydown', function (event) {
    const target = event.target;
    if (event.key === 'Enter' && target.tagName === 'P' && target.textContent.trim() === '') {
        target.contentEditable = false;
        deleteTaskFromDjango(target);
    }
    else if (event.key === 'Enter' && target.tagName === 'P') {
        target.contentEditable = false;
        saveEditedTaskToDjango(target); // Save the edited task
    }

});

taskList2.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.contentEditable = true;
        target.focus();
    }
});

// Keydown event to save changes on Enter and delete the task on empty text
taskList2.addEventListener('keydown', function (event) {
    const target = event.target;
    if (event.key === 'Enter' && target.tagName === 'P' && target.textContent.trim() === '') {
        target.contentEditable = false;
        deleteTaskFromDjango(target);
    }
    else if (event.key === 'Enter' && target.tagName === 'P') {
        target.contentEditable = false;
        saveEditedTaskToDjango(target); // Save the edited task
    }

});

taskList3.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.contentEditable = true;
        target.focus();
    }
});

// Keydown event to save changes on Enter and delete the task on empty text
taskList3.addEventListener('keydown', function (event) {
    const target = event.target;
    if (event.key === 'Enter' && target.tagName === 'P' && target.textContent.trim() === '') {
        target.contentEditable = false;
        deleteTaskFromDjango(target);
    }
    else if (event.key === 'Enter' && target.tagName === 'P') {
        target.contentEditable = false;
        saveEditedTaskToDjango(target); // Save the edited task
    }
});

taskList4.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.contentEditable = true;
        target.focus();
    }
});

// Keydown event to save changes on Enter and delete the task on empty text
taskList4.addEventListener('keydown', function (event) {
    const target = event.target;
    if (event.key === 'Enter' && target.tagName === 'P' && target.textContent.trim() === '') {
        target.contentEditable = false;
        deleteTaskFromDjango(target);
    }
    else if (event.key === 'Enter' && target.tagName === 'P') {
        target.contentEditable = false;
        saveEditedTaskToDjango(target); // Save the edited task
    }

});

// Function to save the edited task to Django
function saveEditedTaskToDjango(pElement) {
    const taskText = pElement.textContent.trim();
    // Add AJAX request to save the edited text to Django

    $.ajax({
        type: 'POST',
        url: '/tasks/update_task/',
        data: {
            id: pElement.parentElement.getAttribute('data-task-id'),
            text: taskText,
        },
        success: function (data) {
            // Handle success
        },
        error: function (xhr, errmsg, err) {
            // Handle errors
        }
    });
}

// Function to delete the task from Django
function deleteTaskFromDjango(pElement) {
    const taskId = pElement.parentElement.getAttribute('data-task-id');
    const taskDiv = pElement.parentElement;
    
    if (!taskId) {
        console.error('Task ID not provided');
        return;
    }

    const requestData = {
        id: taskId
    };

    $.ajax({
        type: 'DELETE',
        url: '/tasks/delete_task/',
        data: JSON.stringify(requestData), // Convert to JSON string
        contentType: 'application/json', // Specify content type
        success: function (data) {
            taskDiv.remove();
        },
        error: function (xhr, errmsg, err) {
            console.error('Error:', xhr.status, errmsg);
        }
    });
}

newTaskInput1.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput1, taskList1, 1);
    }
});

newTaskInput2.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput2, taskList2, 2);
    }
});

newTaskInput3.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput3, taskList3, 3);
    }
});

newTaskInput4.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput4, taskList4, 4);
    }
});

// function updateTaskListFromDjango(taskList, categoryIndex) {
//     // Get the CSRF token
//     const csrftoken = getCSRFToken();

//     // Make an AJAX request to fetch the updated task data from Django
//     $.ajax({
//         type: 'GET',
//         url: '/tasks/get_tasks/',  // Replace with the actual URL to retrieve tasks
//         data: {
//             category: categoryIndex  // Send the category index to your Django view.
//         },
//         headers: {
//             'X-CSRFToken': csrftoken
//         },
//         success: function (data) {
//             // Handle success
//             if ('tasks' in data) {
//                 const taskListData = data.tasks;
//                 // Iterate through the retrieved tasks and add them to the taskList
//                 taskListData.forEach(function (taskText) {
//                     const div = document.createElement('div');
//                     const p = document.createElement('p');
//                     p.textContent = taskText;
//                     let{bg, txt} = getRandomColor(colorarr[categoryIndex][0], colorarr[categoryIndex][1], colorarr[categoryIndex][2]);
//                     div.style.background = bg;
//                     div.style.color = txt;
//                     div.appendChild(p);
//                     taskList.appendChild(div);
//                 });
//             }
//         },
//         error: function (xhr, errmsg, err) {
//             // Handle errors.
//         }
//     });
// }

// newTaskInput1.addEventListener('keyup', function (event) {
//     if (event.key === 'Enter') {
//         const taskText = newTaskInput1.value.trim();
//         if (taskText !== '') {
//             const n = 0;  // Change to the appropriate category index
//             const csrftoken = getCSRFToken();
//             $.ajax({
//                 type: 'POST',
//                 url: '/tasks/create_task/',  // Replace with the actual URL.
//                 data: {
//                     text: taskText,
//                     category: n
//                 },
//                 headers: {
//                     'X-CSRFToken': csrftoken
//                 },
//                 success: function (data) {
//                     // After successfully saving, update the task list
//                     newTaskInput1.value = '';  // Clear the input field
//                     updateTaskListFromDjango(taskList1, n);
                    
//                 },
//                 error: function (xhr, errmsg, err) {
//                     // Handle errors.
//                 }
//             });
//         }
//     }
// });

//for task 1: '#B9E1EE', '#71BDCE', '#398799'
//for task 2 '#D3D1EF', '#BAB6E7', '#5F59A1'
//for task 3: '#F5D4EC', '#F1B1DF', '#94497F'
//for task 4: '#FADDC2', '#F8C08D', '#B37841'
//color3 will always be dark color that is paired with white text

function getRandomColor(color1, color2, color3) {
    let m = Math.random() * 3;
    if (m < 1){
        return {bg:color1, txt:"#4C4C4C"};
    }else if (m < 2){
        return {bg:color2, txt:"#4C4C4C"};
    }else{
        return {bg:color3, txt:"#FFFFFF"};
    }
}



ctasks1.forEach(function(element) {
    let {bg, txt} = getRandomColor("#B9E1EE", "#71BDCE", "#398799");
    element.style.backgroundColor = bg;
    element.style.color = txt;
});


ctasks2.forEach(function(element) {
    let {bg, txt} = getRandomColor('#D3D1EF', '#BAB6E7', '#5F59A1');
    element.style.backgroundColor = bg;
    element.style.color = txt;
});

ctasks3.forEach(function(element) {
    let {bg, txt} = getRandomColor("#F5D4EC", "#F1B1DF", "#94497F");
    element.style.backgroundColor = bg;
    element.style.color = txt;
});

ctasks4.forEach(function(element) {
    let {bg, txt} = getRandomColor('#FADDC2', '#F8C08D', '#B37841');
    element.style.backgroundColor = bg;
    element.style.color = txt;
});
