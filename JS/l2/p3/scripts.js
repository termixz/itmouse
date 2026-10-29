let name = prompt("Введите ваше имя для анкеты: ");
let age = prompt("Введите ваш возраст для анкеты: ");
let city = prompt("Введите ваш город для анкеты: ");
let hobby = prompt("Введите ваше хобби для анкеты: ");
let job = prompt("Введите вашу работу для анкеты: ");
let element = document.getElementById('output');
element.innerHTML = `=== РЕЗУЛЬТАТ АНКЕТЫ === <br> Имя: ${name} <br> Возраст ${age} <br> Город: ${city} <br> Хобби: ${hobby} <br> Профессия: ${job} <br> =======================`;
