// Файл tasks.js: Задачи будут выполняться при загрузке скрипта.

// Задача 1: Изменение текста элемента
// Найдите параграф с id="greeting".
// Измените его текстовое содержимое на "Привет, JavaScript!".
const greeting = document.getElementById('greeting');
greeting.textContent = "Привет, JavaScript!";
// Задача 2: Изменение атрибута изображения
// Найдите изображение с id="imageToChange".
// Измените его атрибут src на "https://itmouse.by/themes/default/img/logo.png".
const imageToChange = document.getElementById('imageToChange');
imageToChange.setAttribute('src', 'https://itmouse.by/themes/default/img/logo.png');
// Задача 3: Изменение стилей элемента
// Найдите параграф с id="textToHighlight".
// Измените его цвет текста (style.color) на 'deeppink' и
// размер шрифта (style.fontSize) на '22px'.
const textToHighlight = document.getElementById('textToHighlight');
textToHighlight.style.color = 'deeppink';
textToHighlight.style.fontSize = '22px';
// Задача 4: Создание и добавление нового элемента
// Найдите список <ul> с id="myList".
// Создайте новый элемент <li>.
// Установите текстовое содержимое нового <li> на "Новый пункт, добавленный JS".
// Добавьте созданный <li> в конец списка myList.
const myList = document.getElementById('myList');
const newItem = document.createElement('li');
newItem.textContent = 'Новый пункт, добавленный JS';
myList.appendChild(newItem);
// Задача 5: Работа с несколькими элементами и их содержимым
// Найдите все элементы <li> с классом "fruit-item" внутри списка <ul id="fruitList">.
// Измените текстовое содержимое ПЕРВОГО из найденных элементов на "Лучший фрукт!".
// Найдите элемент <span id="selectedFruit">.
// Установите его текстовое содержимое на текст измененного ПЕРВОГО элемента fruit-item. 
const fruits = document.querySelectorAll('#fruitList .fruit-item');
fruits[0].textContent = 'Лучший фрукт!';
const selectedFruitDisplay = document.getElementById('selectedFruit');
selectedFruitDisplay.textContent = fruits[0].textContent;
