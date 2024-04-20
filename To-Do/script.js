document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const filterSelect = document.getElementById('filterSelect');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
      taskList.innerHTML = '';
      const filteredTasks = filterTasks(tasks, filterSelect.value);
      filteredTasks.forEach(function(task, index) {
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

  function filterTasks(tasks, filterOption) {
      switch (filterOption) {
          case 'all':
              return tasks;
          case 'completed':
              return tasks.filter(task => task.includes('(completed)'));
          case 'pending':
              return tasks.filter(task => !task.includes('(completed)'));
          default:
              return tasks;
      }
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
          alert('Please enter a task');
      }
  });

  filterSelect.addEventListener('change', function() {
      renderTasks();
  });
});
