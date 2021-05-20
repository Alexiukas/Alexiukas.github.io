//selectors

const toDoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-submit');
const toDoList = document.querySelector('.todo-list');

//Event Listeners
todoButton.addEventListener('click', addToDo);

//Functions
function addToDo(){
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    const newToDo = document.createElement('li');
    newToDo.innerText = 'hey';
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button')
    completeButton.innerHTML = '<i class"fas fa-check"></i>'
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button')
    toDoDiv.appendChild(completeButton);
    toDoDiv.appendChild(deleteButton);

    toDoList.appendChild(toDoDiv);
}