const input = document.querySelector('input');
const todoUl = document.querySelector('.todo');
const finishUl = document.querySelector('.checked');
input.focus();

let todoArray = [];
let finishArray = [];
input.addEventListener('change', eventHandler);

function eventHandler(event) {
  const currentValue = input.value;
  addTodo(currentValue);
}

//==============addTodo============================
function addTodo(value) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  let liId = todoArray.length + 1;

  li.textContent = value;
  li.id = liId;
  todoUl.appendChild(li);

  const delBtn = document.createElement('span');
  delBtn.textContent = ` 🚫`;
  li.appendChild(delBtn);
  delBtn.addEventListener('click', deleteTodo);

  const checkBtn = document.createElement('span');
  checkBtn.textContent = ` ✔`;
  li.appendChild(checkBtn);
  checkBtn.addEventListener('click', checkTodo);

  const todoObj = {
    key: value,
    id: liId,
  };
  todoArray.push(todoObj);
  localSet();
}

//=============deleteTodo==========================
function deleteTodo(event) {
  const delTodo = event.target.parentNode;
  delTodo.remove();

  const rearrTodos = todoArray.filter((re) => {
    return re.id !== Number(delTodo.id);
  });
  todoArray = rearrTodos;
  localSet();
}
//============checkTodo============================
function checkTodo(event) {
  const checkTodo = event.target.parentNode;
  checkTodo.remove();
  const checkTodos = todoArray.filter((re) => {
    return re.id !== Number(checkTodo.id);
  });
  todoArray = checkTodos;
  localSet('todos');
  addFinish(checkTodo.firstChild.data);
}

//==============addFinish==========================
function addFinish(item) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  let liId = finishArray.length + 1;
  li.textContent = item;
  li.id = liId;
  finishUl.appendChild(li);

  const delBtn = document.createElement('span');
  delBtn.textContent = ` 🚫`;
  li.appendChild(delBtn);
  delBtn.addEventListener('click', deleteFinish);

  const reTodoBtn = document.createElement('span');
  reTodoBtn.textContent = `🎗`;
  li.appendChild(reTodoBtn);
  reTodoBtn.addEventListener('click', reTodo);

  const finishObj = {
    key: item,
    id: liId,
  };
  finishArray.push(finishObj);
  saveFinish();
}

//==================reTodo========================
function reTodo(event) {
  const reTodo = event.target.parentNode;
  reTodo.remove();
  const reTodos = finishArray.filter((re) => {
    return re.id !== Number(reTodo.id);
  });
  finishArray = reTodos;
  saveFinish();
  addTodo(reTodo.firstChild.data);
}

//==================delFinishr===================
function deleteFinish(event) {
  delFinish = event.target.parentNode;
  delFinish.remove();
  const arrFinish = finishArray.filter((arr) => {
    return arr.id !== Number(delFinish.id);
  });
  finishArray = arrFinish;
  saveFinish();
}

//===============load===========================
function localSet() {
  input.focus();
  input.value = '';
  localStorage.setItem('todos', JSON.stringify(todoArray));
}
function localLoad() {
  const localGet = localStorage.getItem('todos');
  if (localGet === null) {
    return;
  } else {
    const parseLocal = JSON.parse(localGet);
    parseLocal.forEach((todo) => {
      addTodo(todo.key);
    });
  }
}

function saveFinish() {
  localStorage.setItem('finished', JSON.stringify(finishArray));
}
function loadFinish() {
  const getFinish = localStorage.getItem('finished');
  if (getFinish === null) {
    return;
  } else {
    const parseFinish = JSON.parse(getFinish);
    parseFinish.forEach((data) => {
      addFinish(data.key);
    });
  }
}

localLoad();
loadFinish();
