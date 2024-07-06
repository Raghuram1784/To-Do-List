let todoList = [];
let completedTasks = 0;
let pendingTasks = 0;

document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const addButton = document.getElementById("add-button");
    const listContainer = document.getElementById("list-container");
    const deleteSelectedButton = document.getElementById("delete-selected");
    const deleteAllButton = document.getElementById("delete-all");
    const completedTasksElement = document.getElementById("completed-tasks");
    const pendingTasksElement = document.getElementById("pending-tasks");

    addButton.addEventListener("click", addTask);
    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    deleteSelectedButton.addEventListener("click", deleteSelectedTasks);
    deleteAllButton.addEventListener("click", deleteAllTasks);

    function addTask() {
        const task = inputBox.value.trim();
        if (task !== "") {
            todoList.push({ task: task, completed: false });
            pendingTasks++;
            updateTaskList();
            inputBox.value = "";
            saveTaskData();
        }
        else{
            alert("🚨 Task cannot be empty ✎")
        }
    }

    function updateTaskList() {
        listContainer.innerHTML = "";
        todoList.forEach((task, index) => {
            const taskElement = document.createElement("li");
            taskElement.textContent = task.task;
            taskElement.className = task.completed ? "checked" : "";
            taskElement.addEventListener("click", function() {
                toggleTaskCompletion(index);
            });
            const deleteButton = document.createElement("span");
            deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
            // deleteButton.innerHTML = "<i class="fa-regular fa-trash"></i>";
            deleteButton.addEventListener("click", function() {
                deleteTask(index);
            });
            taskElement.appendChild(deleteButton);
            listContainer.appendChild(taskElement);
        });
        updateTaskStatus();
        saveTaskData();
    }

    function toggleTaskCompletion(index) {
        todoList[index].completed = !todoList[index].completed;
        updateTaskList();
    }

    function deleteTask(index) {
        todoList.splice(index, 1);
        if (todoList.length === 0) {
            completedTasks = 0;
            pendingTasks = 0;
        } else {
            updateTaskStatus();
        }
        updateTaskList();
        saveTaskData();
    }

    function deleteSelectedTasks() {
        todoList = todoList.filter(task => !task.completed);
        completedTasks = 0;
        pendingTasks = todoList.length;
        updateTaskList();
        saveTaskData();
    }

    function deleteAllTasks() {
        todoList = [];
        completedTasks = 0;
        pendingTasks = 0;
        updateTaskList();
        saveTaskData();
    }

    function updateTaskStatus() {
        completedTasks = todoList.filter(task => task.completed).length;
        pendingTasks = todoList.length - completedTasks;
        completedTasksElement.textContent = `Completed: ${completedTasks}`;
        pendingTasksElement.textContent = `Pending: ${pendingTasks}`;
        saveTaskData();
    }

    function saveTaskData() {
        localStorage.setItem("todoList", todoList.map(task => task.task));
        localStorage.setItem("completedTasks", completedTasks);
        localStorage.setItem("pendingTasks", pendingTasks);
    }

    function showTasks() {
        const storedTodoList = localStorage.getItem("todoList");
        if (storedTodoList) {
            todoList = storedTodoList.split(",").map(task => ({ task: task, completed: false }));
        }
        completedTasks = parseInt(localStorage.getItem("completedTasks")) || 0;
        pendingTasks = parseInt(localStorage.getItem("pendingTasks")) || 0;
        updateTaskList();
        updateTaskStatus();
    }

    showTasks();
});
//////////--------------------------->>>>>>>>>>>>>>>>>>>>