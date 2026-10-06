const STORAGE_KEY = "tasks";
const form = document.getElementById("task-form");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Tasks live in memory as an array of objects: { id, text, done }
let tasks = loadTasks();

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (err) {
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
        console.error("Could not save tasks:", err);
    }
}

function render() {
    listContainer.innerHTML = "";

    if (tasks.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks yet. Add one above.";
        listContainer.appendChild(empty);
        return;
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        if (task.done) li.classList.add("checked");
        li.textContent = task.text;           // textContent: safe, no HTML injected

        const del = document.createElement("button");
        del.type = "button";
        del.className = "delete";
        del.setAttribute("aria-label", "Delete task");
        del.textContent = "\u00d7";
        li.appendChild(del);

        listContainer.appendChild(li);
    });
}

function addTask() {
    const text = inputBox.value.trim();
    if (text === "") {
        alert("You must write something!");
        return;
    }
    tasks.push({ id: Date.now().toString(), text: text, done: false });
    inputBox.value = "";
    saveTasks();
    render();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();                       // Add button and Enter key both work
    addTask();
});

listContainer.addEventListener("click", function (e) {
    const li = e.target.closest("li[data-id]");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.closest(".delete")) {
        tasks = tasks.filter(function (t) { return t.id !== id; });
    } else {
        const task = tasks.find(function (t) { return t.id === id; });
        if (task) task.done = !task.done;
    }
    saveTasks();
    render();
});

render();