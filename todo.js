const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS ='toDo';

let toDo = [];

function saveTodo(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDo));
}


function deleteTodo(){
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter
    const cleanToDo = toDo.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDo = cleanToDo;
    saveTodo();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDo.length+1;
    delBtn.innerHTML ="X";
    delBtn.addEventListener("click",deleteTodo);
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
        //forEach
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