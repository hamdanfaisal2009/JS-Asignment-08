let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let searchBtn = document.getElementById("searchBtn");
let searchModal = document.getElementById("searchModal");
let searchInput = document.getElementById("searchInput");
let searchCloseBtn = document.getElementById("searchCloseBtn");

let taskModal = document.getElementById("taskModal");
let closeModal = document.getElementById("closeModal");

let editTask = null;

function addTask() {

    if (taskInput.value.trim() === "") {
        return;
    }

    if (editTask !== null) {

        editTask.querySelector(".task-text").textContent = taskInput.value;

        editTask = null;
        addBtn.textContent = "Add Task";
        taskInput.value = "";

        return;
    }

    let li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>

        <div class="task-actions">
            <button class="view-btn">View</button>
            <button class="edit-btn">Edit</button>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    viewTask(li);
    editTaskFunction(li);
    markTaskAsCompleted(li);
    deleteTask(li);

    taskInput.value = "";

    updateTaskCount();
}

function viewTask(task) {

    let viewBtn = task.querySelector(".view-btn");

    viewBtn.addEventListener("click", function () {

        let taskText = task.querySelector(".task-text").textContent;

        document.getElementById("modalTask").textContent = taskText;

        document.getElementById("modalDetails").textContent =
            "This task is currently active and has been added to your todo list.";

        taskModal.classList.add("active");
    });
}

function editTaskFunction(task) {

    let editBtn = task.querySelector(".edit-btn");

    editBtn.addEventListener("click", function () {

        taskInput.value =
            task.querySelector(".task-text").textContent;

        editTask = task;

        addBtn.textContent = "Update Task";

        taskInput.focus();
    });
}

function markTaskAsCompleted(task) {

    let completeBtn = task.querySelector(".complete-btn");

    completeBtn.addEventListener("click", function () {

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {
            completeBtn.textContent = "Completed";
        } else {
            completeBtn.textContent = "Complete";
        }
    });
}

function deleteTask(task) {

    let deleteBtn = task.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {

        task.remove();

        updateTaskCount();
    });
}

function updateTaskCount() {

    let totalTasks = taskList.children.length;

    taskCount.textContent = totalTasks + " Tasks";
}

function searchTasks() {

    let searchValue = searchInput.value.toLowerCase();

    let tasks = taskList.children;

    for (let i = 0; i < tasks.length; i++) {

        let taskText = tasks[i]
            .querySelector(".task-text")
            .textContent
            .toLowerCase();

        if (taskText.includes(searchValue)) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});

searchBtn.addEventListener("click", function () {

    searchModal.classList.add("active");

    searchInput.focus();
});

searchInput.addEventListener("input", searchTasks);

searchCloseBtn.addEventListener("click", function () {

    searchModal.classList.remove("active");

    searchInput.value = "";

    searchTasks();
});

searchModal.addEventListener("click", function (event) {

    if (event.target === searchModal) {

        searchModal.classList.remove("active");

        searchInput.value = "";

        searchTasks();
    }
});

closeModal.addEventListener("click", function () {

    taskModal.classList.remove("active");
});

taskModal.addEventListener("click", function (event) {

    if (event.target === taskModal) {
        taskModal.classList.remove("active");
    }
});
