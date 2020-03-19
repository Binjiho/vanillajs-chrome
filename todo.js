const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS ='toDo';

const toDo = [];

function saveTodo(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDo));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDo.length+1;
    delBtn.innerHTML ="X";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDo.push(toDoObj);
    saveTodo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDo(){
    const loadedTodo = localStorage.getItem(TODO_LS);
    if(loadedTodo !== null){
        const parsedToDo = JSON.parse(loadedTodo);
        parsedToDo.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDo();
    toDoform.addEventListener("submit",handleSubmit);
}

init();