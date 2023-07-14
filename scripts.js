const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

let tasks = [];

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});

// Save tasks to localStorage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a task
const addTask = () => {
  const taskText = todoInput.value.trim();

  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };
    tasks.push(task);
    todoInput.value = '';

    saveTasksToLocalStorage(); // Save tasks to localStorage
    renderTasks(); // Render the updated tasks
  }
};

// Create new task items
const createTaskItem = (task) => {
  const taskItem = document.createElement('li');
  taskItem.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.checked = task.completed;

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => deleteTask(task));

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(deleteBtn);

  return taskItem;
};

// Delete a task
const deleteTask = (task) => {
  tasks = tasks.filter(t => t !== task);

  saveTasksToLocalStorage(); // Save tasks to localStorage
  renderTasks(); // Render the updated tasks
};

// Toggle task completion
const toggleTask = (task) => {
  task.completed = !task.completed;

  saveTasksToLocalStorage(); // Save tasks to localStorage
  renderTasks(); // Render the updated tasks
};

// Render tasks
const renderTasks = () => {
  todoList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
  });
};

// Event listeners
addTaskButton.addEventListener('click', addTask);
todoInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

todoList.addEventListener('change', (event) => {
  const taskIndex = Array.from(todoList.children).indexOf(event.target.parentNode);
  const task = tasks[taskIndex];
  toggleTask(task);
});
