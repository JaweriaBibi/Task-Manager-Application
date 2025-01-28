const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:3000/tasks';

// Fetch tasks on load
document.addEventListener('DOMContentLoaded', fetchTasks);

// Add a new task
addTaskButton.addEventListener('click', async () => {
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
        alert('Task cannot be empty!');
        return;
    }
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskTitle })
    });
    taskInput.value = '';
    fetchTasks();
});

// Fetch tasks from the backend
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    taskList.innerHTML = tasks.map(task => `
        <li class="task-item">
            ${task.title}
            <button class="edit" onclick="editTask(${task.id}, '${task.title}')">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
}

// Edit a task
async function editTask(id, oldTitle) {
    const newTitle = prompt('Edit Task:', oldTitle);
    if (newTitle) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });
        fetchTasks();
    }
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}
