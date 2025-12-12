const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const filterDate = document.getElementById("filter-date");

let todos = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    const date = todoDate.value;

    if (!text || !date) {
        alert("Please fill out task and date!");
        return;
    }

    const todo = {
        id: Date.now(),
        text,
        date
    };

    todos.push(todo);
    renderTodos(todos);

    todoInput.value = "";
    todoDate.value = "";
});

filterDate.addEventListener("change", () => {
    const selectedDate = filterDate.value;
    if (!selectedDate) {
        renderTodos(todos);
    } else {
        const filtered = todos.filter(t => t.date === selectedDate);
        renderTodos(filtered);
    }
});

function renderTodos(list) {
    todoList.innerHTML = "";

    list.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        li.innerHTML = `
            <span>${todo.text} — ${todo.date}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;

        todoList.appendChild(li);
    });
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos(todos);
}
