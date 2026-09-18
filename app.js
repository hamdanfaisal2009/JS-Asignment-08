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

    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        return;
    }

    if (editTask !== null) {

        editTask.querySelector(".task-text").textContent = taskValue;

        editTask = null;

        addBtn.querySelector("span").textContent = "Add Task";

        taskInput.value = "";

        searchTasks();

        return;
    }

    let li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
        <span class="task-text">${taskValue}</span>

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

    searchTasks();
}


function viewTask(task) {

    let viewBtn = task.querySelector(".view-btn");

    viewBtn.addEventListener("click", function () {

        let taskText = task.querySelector(".task-text").textContent;

        document.getElementById("modalTask").textContent = taskText;

        if (task.classList.contains("completed")) {
            document.getElementById("modalDetails").textContent =
                "This task has been completed.";
        } else {
            document.getElementById("modalDetails").textContent =
                "This task is currently active and has been added to your todo list.";
        }

        taskModal.classList.add("active");
    });
}


function editTaskFunction(task) {

    let editBtn = task.querySelector(".edit-btn");

    editBtn.addEventListener("click", function () {

        taskInput.value = task.querySelector(".task-text").textContent;

        editTask = task;

        addBtn.querySelector("span").textContent = "Update Task";

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

        if (editTask === task) {
            editTask = null;
            taskInput.value = "";
            addBtn.querySelector("span").textContent = "Add Task";
        }

        task.remove();

        updateTaskCount();

        searchTasks();
    });
}


function updateTaskCount() {

    let totalTasks = taskList.children.length;

    taskCount.textContent = totalTasks + " Tasks";
}


function searchTasks() {

    let searchValue = searchInput.value.toLowerCase().trim();

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

    searchInput.value = "";

    searchTasks();

    searchInput.focus();
});


searchInput.addEventListener("input", function () {

    searchTasks();
});


function closeSearch() {

    searchModal.classList.remove("active");

    searchInput.value = "";

    searchTasks();
}


searchCloseBtn.addEventListener("click", closeSearch);


searchModal.addEventListener("click", function (event) {

    if (event.target === searchModal) {
        closeSearch();
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
