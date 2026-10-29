var counter = Number(localStorage.getItem('counter')) || 0;
const keys = Object.keys(localStorage).sort((a, b) => a - b);

keys.forEach(key => {
    if (!isNaN(key) && key !== 'counter') {
        const rawData = localStorage.getItem(key);
        const data = JSON.parse(rawData);
        renderTaskFromStorage(key, data.text, data.completed);
    }
});

let draggedItem = null;

const input = document.querySelector('.addTask');
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const str = event.target.value;
        if (!str || str.trim().length === 0) {
            alert("Enter a correct value!");
            event.target.value = '';
            return;
        }
        addTask(str);
        event.target.value = '';
    }
});

const submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
    const input = document.querySelector('.addTask');
    const str = input.value;
    if (!str || str.trim().length === 0) {
        alert("Введите корректное значение!");
        input.value = '';
        return;
    }
    addTask(str);
    input.value = '';
});

function renderTaskFromStorage(id, str, isCompleted) {
    const tasks = document.getElementById('list');
    const newTask = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = id + ". " + str;
    if (isCompleted){
        taskText.classList.add('completed');
    }
    
    newTask.appendChild(taskText);
    newTask.setAttribute('id', id);
    newTask.setAttribute('class', 'notComplete');
    newTask.draggable = true;

    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'task-btns');

    const newbutton1 = document.createElement('button');
    newbutton1.textContent = "Удалить";
    newbutton1.setAttribute('class', 'deleter');
    newbutton1.addEventListener('click', deleteTask);

    const newbutton2 = document.createElement('button');
    newbutton2.textContent = "Выполнить";
    newbutton2.setAttribute('class', 'completer');
    newbutton2.addEventListener('click', completeTask);

    btnContainer.appendChild(newbutton1);
    btnContainer.appendChild(newbutton2);
    newTask.appendChild(btnContainer);
    addDragEvents(newTask);
    tasks.appendChild(newTask);
}

function addTask(str) {
    counter++;
    localStorage.setItem('counter', counter);
    renderTaskFromStorage(counter, str, false);
    localStorage.setItem(String(counter), JSON.stringify({text: str, completed: false}));
}

function addDragEvents(item) {
    item.addEventListener('dragstart', function() {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', function() {
        this.classList.remove('dragging');
        draggedItem = null;
        reorderTasks();
    });

    item.addEventListener('dragover', (event) => event.preventDefault());

    item.addEventListener('drop', function(event) {
        event.preventDefault();
        const container = document.getElementById('list');
        if (this !== draggedItem) {
            const allItems = [...container.querySelectorAll('li')];
            const currentIndex = allItems.indexOf(this);
            const draggedIndex = allItems.indexOf(draggedItem);

            if (currentIndex > draggedIndex) {
                this.after(draggedItem);
            } else {
                this.before(draggedItem);
            }
        }
    });
}

function reorderTasks() {
    const items = document.querySelectorAll('#list li');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.clear();
    counter = 0;
    items.forEach((item, index) => {
        counter = index + 1;
        item.id = counter;
        let span = item.querySelector('span');
        let isDone = span.classList.contains('completed');
        let parts = span.textContent.split('. ');
        parts.shift();
        let actualText = parts.join('. ');
        span.textContent = counter + ". " + actualText;
        localStorage.setItem(String(counter), JSON.stringify({text: actualText, completed: isDone}));
    });
    localStorage.setItem('counter', counter);
    if (isDark) document.body.classList.add('dark-theme');
}

function deleteTask(event) {
    let li = event.target.closest('li');
    li.remove();
    reorderTasks();
}

function completeTask(event) {
    const li = event.target.closest('li');
    const span = li.querySelector('span');
    span.classList.toggle('completed');
    reorderTasks();
}

function showCompleted() {
    const items = document.querySelectorAll('#list li');
    items.forEach(item => {
        const span = item.querySelector('span');
        item.style.display = span.classList.contains('completed') ? 'flex' : 'none';
    });
}

function showAll() {
    const items = document.querySelectorAll('#list li');
    items.forEach(item => item.style.display = 'flex');
}

function switcher() {
    document.body.classList.toggle('dark-theme');
    const themeBtn = document.querySelector('.switcher');
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? "☀️" : "🌚";
}
