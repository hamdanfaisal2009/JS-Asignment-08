let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let taskModal = document.getElementById("taskModal");
let closeModal = document.getElementById("closeModal");

let searchInput = document.getElementById("searchInput");

function addTask() {
  if (taskInput.value.trim() === "") {
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
  editTask(li);
  markTaskAsCompleted(li);
  deleteTask(li);

  taskInput.value = "";

  updateTaskCount();
}


// =========================
// VIEW TASK
// =========================

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


// =========================
// EDIT TASK
// =========================

function editTask(task) {
  let editBtn = task.querySelector(".edit-btn");

  editBtn.addEventListener("click", function () {
    let taskText = task.querySelector(".task-text");

    let newTask = prompt("Edit your task:", taskText.textContent);

    if (newTask !== null && newTask.trim() !== "") {
      taskText.textContent = newTask.trim();
    }
  });
}


// =========================
// COMPLETE TASK
// =========================

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


// =========================
// DELETE TASK
// =========================

function deleteTask(task) {
  let deleteBtn = task.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function () {
    task.remove();

    updateTaskCount();
  });
}


// =========================
// UPDATE TASK COUNT
// =========================

function updateTaskCount() {
  let totalTasks = taskList.children.length;

  taskCount.textContent = totalTasks + " Tasks";
}


// =========================
// SEARCH TASK
// =========================

function searchTasks() {
  let searchValue = searchInput.value.toLowerCase().trim();

  let tasks = taskList.querySelectorAll(".task-item");

  tasks.forEach(function (task) {
    let taskText = task
      .querySelector(".task-text")
      .textContent
      .toLowerCase();

    if (taskText.includes(searchValue)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}


// =========================
// ADD TASK BUTTON
// =========================

addBtn.addEventListener("click", addTask);


// =========================
// ENTER KEY TO ADD TASK
// =========================

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


// =========================
// SEARCH INPUT
// =========================

searchInput.addEventListener("input", searchTasks);


// =========================
// CLOSE MODAL
// =========================

closeModal.addEventListener("click", function () {
  taskModal.classList.remove("active");
});


// =========================
// CLOSE MODAL ON OUTSIDE CLICK
// =========================

taskModal.addEventListener("click", function (event) {
  if (event.target === taskModal) {
    taskModal.classList.remove("active");
  }
});
