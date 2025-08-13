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
     li.setAttribute('data-id',tasks.id)
     li.innerHTML = `
     <span>${task.text}</span>
     <button>delete</button>
     `
     taskList.appendChild(li);
    }


function saveTasks() {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


});