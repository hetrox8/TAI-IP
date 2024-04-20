document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
      const li = document.createElement('li');
      li.textContent = task;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';
      deleteButton.addEventListener('click', function() {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  renderTasks();

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskInput.value = '';
    } else {
      alert('please enter a task')
    }
  });
});
