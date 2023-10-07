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

// Function to add a new task
function addNewTask(taskInput, taskList) {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = taskText;
        div.appendChild(p);
        taskList.appendChild(div);
        taskInput.value = '';
    }
}

// // Event listener for the "Add Task" button
// addTaskButton.addEventListener('click', addNewTask);

// Event listener to add tasks when Enter key is pressed
newTaskInput1.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput1, taskList1);
    }
});

newTaskInput2.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput2, taskList2);
    }
});

newTaskInput3.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput3, taskList3);
    }
});

newTaskInput4.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNewTask(newTaskInput4, taskList4);
    }
});
