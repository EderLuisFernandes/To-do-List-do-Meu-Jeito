// seleção de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
// ele vai adicionar o valor na tela
function renderizandoLista() {
  todoList.innerHTML = "";
  Lista.forEach((text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    const nLista = document.createElement("h3");
    nLista.innerText = text;
    todo.appendChild(nLista);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    todoList.appendChild(todo);
  });
}
function saveLocalS() {
  localStorage.setItem("Lista", JSON.stringify(Lista));
}

const saveTodo = (text) => {
  Lista.push(text);
  renderizandoLista();
  saveLocalS();
};
let Lista = [];
try {
  Lista = JSON.parse(localStorage.getItem("Lista")) || [];
} catch (error) {
  console.error("Error parsing local storage:", error);
}
saveLocalS();
renderizandoLista();

function PegandoValor(event) {
  event.preventDefault();
  const inputValue = todoInput.value.trim();

  if (inputValue !== "") {
    saveTodo(inputValue);
    todoInput.value = "";
    todoInput.focus();
  }
}

function mudarEditacao() {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

todoForm.addEventListener("submit", PegandoValor);

document.addEventListener("click", (event) => {
  const target1 = event.target;
  const parent = target1.closest("div");
  let todoTitle;

  if (parent && parent.querySelector("h3")) {
    todoTitle = parent.querySelector("h3").innerText;
  }
  if (target1.classList.contains("finish-todo")) {
    parent.classList.toggle("done");
  }
  if (target1.classList.contains("remove-todo")) {
    parent.remove();
    const indexToRemove = Lista.indexOf(todoTitle);
    if (indexToRemove !== -1) {
      Lista.splice(indexToRemove, 1);
      saveLocalS();
    }
  }
  if (target1.classList.contains("edit-todo")) {
    mudarEditacao();

    editInput.value = todoTitle;
    oldinputvalue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mudarEditacao();
});

function atualizarLista(text) {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");
    if (todoTitle.innerText === oldinputvalue) {
      todoTitle.innerText = text;
    }
  });
}

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editar = editInput.value;
  if (editar) {
    atualizarLista(editar);
  }
  mudarEditacao();
});
