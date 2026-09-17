let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let taskModal = document.getElementById("taskModal");
let closeModal = document.getElementById("closeModal");

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
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

  taskList.appendChild(li);

  viewTask(li);
  markTaskAsCompleted(li);
  deleteTask(li);

  taskInput.value = "";

  updateTaskCount();
}

let li = document.querySelector("li");
viewTask(li);
markTaskAsCompleted(li);
deleteTask(li);

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

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
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