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

const formsubmit = document.getElementById('submit');
const colorarr = [["#B9E1EE", "#71BDCE", "#398799"], ['#D3D1EF', '#BAB6E7', '#5F59A1'],['#F5D4EC', '#F1B1DF', '#94497F'],['#FADDC2', '#F8C08D', '#B37841']]

/*task editors*/
// Function to add a new task
function addNewTask(taskInput, taskList, tasknum) {
    const taskText = taskInput.value.trim();
    let n = tasknum-1;
    if (taskText !== '') {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = taskText;
        let{bg, txt} = getRandomColor(colorarr[n][0], colorarr[n][1], colorarr[n][2]);
        div.style.background = bg;
        div.style.color = txt;
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

/*event editors*/
/*directs user back to previous page after submitting the form*/
formsubmit.onclick = function(event){
    event.preventDefault();
    //data processing will need to be put here
    window.location.replace("calender.html");
};