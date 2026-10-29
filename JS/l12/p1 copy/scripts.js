var counter = 0;

function addTask(str){
    while(!str || str.trim().length === 0) {
        str = prompt("Введите корректную задачу:");
    }
    counter++
    const tasks = document.getElementById('list');
    const newTask = document.createElement('li');
    
    const taskText = document.createElement('span');
    taskText.textContent = String(counter) + ". " + str;
    newTask.appendChild(taskText);

    newTask.setAttribute('id', counter)
    newTask.setAttribute('class', 'notComplete')
    
    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'task-btns');

    const newbutton1 = document.createElement('button');
    newbutton1.textContent = "Удалить";
    newbutton1.setAttribute('class', 'deleter')
    newbutton1.onclick = deleteTask;

    const newbutton2 = document.createElement('button');
    newbutton2.textContent = "Выполненно";
    newbutton2.setAttribute('class', 'completer')
    newbutton2.onclick = completeTask;

    btnContainer.appendChild(newbutton1);
    btnContainer.appendChild(newbutton2);
    
    newTask.appendChild(btnContainer);
    tasks.appendChild(newTask);
}

function deleteTask(event){
    let li = event.target.closest('li');
    let id = li.id;

    if(counter == id){
        counter--;
    } else {
        for(let i = Number(id) + 1; i <= counter; i++){
            let doc = document.getElementById(i);
            if(doc) {
                doc.setAttribute('id', i - 1);
                
                let text = doc.childNodes[0].textContent;
                let array = text.split(' '); 
                
                array[0] = (i - 1) + "."; 
                doc.childNodes[0].textContent = array.join(' ');
            }
        }
        counter--;
    }
    li.remove();
}

function completeTask(event){
    const li = event.target.closest('li');
    li.firstElementChild.classList.toggle('completed');
}

function showCompleted(){
    const items = document.querySelectorAll('#list li');
    items.forEach(item => {
        if(item.classList.contains('completed')){
            item.style.display = 'flex';
        } else{
            item.style.display = 'none';
        }
    });
}

function showAll(){
    const items = document.querySelectorAll('#list li');
    items.forEach(item => {
        item.style.display = 'flex';
    });
}
function switcher(){
    document.body.classList.toggle('dark-theme');
    const themeBtn = document.querySelector('.switcher');
    
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.textContent = "☀️"; 
    } else {
        themeBtn.textContent = "🌚"; 
    }
}
