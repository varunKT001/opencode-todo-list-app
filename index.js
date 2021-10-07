var TODOS = [];

window.addEventListener('load', function () {
  let Todos = localStorage.getItem('todos');
  if (Todos) {
    TODOS = JSON.parse(Todos);
    DisplayTodos();
  }
});

document.getElementById('add-todo-btn').addEventListener('click', addTodo);

function UpdateLocalStorage() {
  let TodoString = JSON.stringify(TODOS);
  localStorage.setItem('todos', TodoString);
}

function addTodo(event) {
  event.preventDefault();
  let TodoText = document.getElementById('todo-text').value;

  if (!TodoText) {
    ShowAlert('Please write a todo &#128528;', 'danger');
  } else {
    TODOS.push(TodoText);
    UpdateLocalStorage();
    DisplayTodos();
    ShowAlert('Todo added successfully 	&#128512;', 'success');
    document.getElementById('todo-text').value = '';
  }
}

function DisplayTodos() {
  TODOLIST = ``;
  TODOS.forEach((todo, index) => {
    TODOLIST += `<div class="todo-list card w-50 mx-auto my-3">
        <div class="card-body">
          <p class="card-text">
            ${todo}
          </p>
          <button type="button" class="btn btn-danger" onclick="DeleteTodo(${index})">Delete</button>
        </div>
      </div>`;
  });
  document.getElementById('todo-list-container').innerHTML = TODOLIST;
}

function DeleteTodo(index) {
  TODOS.splice(index, 1);
  UpdateLocalStorage();
  DisplayTodos();
  ShowAlert('Todo deleted successfully &#128578;', 'danger');
}

function ShowAlert(text, type) {
  let Alert = document.createElement('div');
  Alert.classList.add('todo-alert', 'w-50', 'mx-auto');
  Alert.innerHTML = `<div
        class="
          alert alert-${type} alert-dismissible
          fade
          show
        "
        role="alert"
      >
        <strong>${text}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>`;
  document.querySelector('main').prepend(Alert);
}
