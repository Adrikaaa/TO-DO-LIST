document.addEventListener("DOMContentLoaded", () => {
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem('tasks') )|| [];

tasks.forEach((task) => renderTask(task));

addTaskBtn.addEventListener("click", () => { 
    const taskText= taskInput.value.trim()
    if(taskText==="") return;


    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask); 
    saveTasks();
    renderTask(newTask);
    taskInput.value=""//clear input
    console.log(tasks);
})

function renderTask(task){
     const li =document.createElement("li");
     li.setAttribute('data-id',task.id)
     if(task.completed) li.classList.add('completed');
     li.innerHTML = `
       <span>${task.text}</span>
       <button>delete</button>
     `;
     li.addEventListener('click',(e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed;
        li.classList.toggle('completed',task.completed);
        saveTasks();
     })

     li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from toggling completion
        const taskId = li.getAttribute('data-id');
        tasks = tasks.filter(t => t.id != taskId);
        li.remove();
        saveTasks();
     });
     taskList.appendChild(li);
    }


function saveTasks() {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


});