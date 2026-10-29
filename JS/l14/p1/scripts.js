let views = Number(localStorage.getItem('pageViews')) || 0;
views++;
localStorage.setItem('pageViews', views);
alert(`Count of views: ${views}`);

let countertea = Number(localStorage.getItem('tea')) || 0;
let countercoffee = Number(localStorage.getItem('coffee')) || 0;
let counterbiscuits = Number(localStorage.getItem('biscuits')) || 0;
let sum = Number(localStorage.getItem('sum')) || 0;

const saver = document.getElementById('saver');
const h5 = document.querySelector('h5');
const themeSelect = document.getElementById('theme');
const current = document.getElementById('current');
const listItems = document.querySelectorAll('li');

function refreshSettings() {
    const savedName = localStorage.getItem('name');
    const savedTheme = localStorage.getItem('theme');

    if (savedName) {
        current.textContent = `Текущие настройки: Имя: ${savedName}, Тема: ${savedTheme}`;
    }

    if (savedTheme === 'Темная тема') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    if (listItems.length >= 3) {
        listItems[0].textContent = `Чай - 100р х ${countertea} = ${100 * countertea}р`;
        listItems[1].textContent = `Кофе - 200р х ${countercoffee} = ${200 * countercoffee}р`;
        listItems[2].textContent = `Печенье - 150р х ${counterbiscuits} = ${150 * counterbiscuits}р`;
    }
    
    h5.textContent = `Итого: ${sum}р`;
}

refreshSettings();

saver.addEventListener('click', function() {
    const nameValue = document.getElementById('name').value;
    const themeValue = document.getElementById('theme').value;
    
    localStorage.setItem('name', nameValue);
    localStorage.setItem('theme', themeValue);
    refreshSettings();
});

themeSelect.addEventListener('change', function() {
    localStorage.setItem('theme', themeSelect.value);
    refreshSettings();
});

document.getElementById('tea').addEventListener('click', function() {
    countertea++;
    sum += 100;
    saveAndRefresh('tea', countertea);
});

document.getElementById('coffee').addEventListener('click', function() {
    countercoffee++;
    sum += 200;
    saveAndRefresh('coffee', countercoffee);
});

document.getElementById('biscuits').addEventListener('click', function() {
    counterbiscuits++;
    sum += 150;
    saveAndRefresh('biscuits', counterbiscuits);
});

function saveAndRefresh(key, value) {
    localStorage.setItem(key, value);
    localStorage.setItem('sum', sum);
    refreshSettings();
}
