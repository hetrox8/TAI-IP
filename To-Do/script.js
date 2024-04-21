document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const filterSelect = document.getElementById('filterSelect');
    const sortSelect = document.getElementById('sortSelect');
    const clearTasksBtn = document.getElementById('clearTasks');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = filterTasks(tasks, filterSelect.value);
        const sortedTasks = sortTasks(filteredTasks, sortSelect.value);
        sortedTasks.forEach(function(task, index) {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                tasks[index].completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
                if (checkbox.checked) {
                    triggerConfetti();
                }
            });
            li.appendChild(checkbox);
            const span = document.createElement('span');
            span.textContent = task.name;
            if (task.completed) {
                span.style.textDecoration = 'line-through';
            }
            li.appendChild(span);
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
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'pending':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }

    function sortTasks(tasks, sortOption) {
        switch (sortOption) {
            case 'alphabetical':
                return tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
            default:
                return tasks;
        }
    }

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    renderTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if(taskText !== '') {
            tasks.push({ name: taskText, completed: false });
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

    sortSelect.addEventListener('change', function() {
        renderTasks();
    });

    clearTasksBtn.addEventListener('click', function() {
        tasks = [];
        localStorage.removeItem('tasks');
        renderTasks();
    });
});
