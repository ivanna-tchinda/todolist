//SELECTEURS
const todoInput = document.querySelector('.todo-input')
const addButton = document.querySelector('.add2');
const todoList = document.querySelector('.todo-list');

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);


//FUNCTIONS
function addTodo(event){
    event.preventDefault();
   //Todo DIV
   const todoDiv = document.createElement('div');
   todoDiv.classList.add("todo")
   //Cercle Check
   const completedCircle = document.createElement('img');
   completedCircle.src= 'undone.png';
   completedCircle.classList.add('check');
   todoDiv.appendChild(completedCircle);
   //Todo LI
   const newTodo = document.createElement('li');
   newTodo.innerHTML = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   //Ajouter la todo au localstorage
   saveLocalTodos(todoInput.value);
   //Bouton Supprimer
   const trashButton = document.createElement('img');
   trashButton.src = 'trash.png';
   trashButton.classList.add('trash');
   todoDiv.appendChild(trashButton);
   //AJOUTER NOTRE TODO A TODO-LIST
   todoList.appendChild(todoDiv);
   todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash'){
        const todo = item.parentElement;
        todo.remove();  
        removeLocalTodos(todo);    
    }
    if (item.classList[0] === 'check'){
        if (item.src == 'file:///C:/Users/Ivann/OneDrive/Documents/GitHub/todolist/undone.png'){
            item.src = 'file:///C:/Users/Ivann/OneDrive/Documents/GitHub/todolist/done.png';
        }
        else{
            item.src = 'file:///C:/Users/Ivann/OneDrive/Documents/GitHub/todolist/undone.png';
        }

    }
}

function saveLocalTodos(todo){
    //checker s'il y a des items existants
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else  {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo){
        //Todo DIV
   const todoDiv = document.createElement('div');
   todoDiv.classList.add("todo")
   //Cercle Check
   const completedCircle = document.createElement('img');
   completedCircle.src= 'undone.png';
   completedCircle.classList.add('check');
   todoDiv.appendChild(completedCircle);
   //Todo LI
   const newTodo = document.createElement('li');
   newTodo.innerHTML = todo;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   //Bouton Supprimer
   const trashButton = document.createElement('img');
   trashButton.src = 'trash.png';
   trashButton.classList.add('trash');
   todoDiv.appendChild(trashButton);
   //AJOUTER NOTRE TODO A TODO-LIST
   todoList.appendChild(todoDiv);
   todoInput.value = "";
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}