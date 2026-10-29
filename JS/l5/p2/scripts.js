const time = prompt("Введите время суток");
switch(time){
    case "утро" :
        alert("Доброе утро!");
        break;
    case "вечер" :
        alert("Добрый вечер!");
        break;
    case "день":
        alert("Добрый день!");
        break;
    case "ночь" :
        alert("Добрая ночь!");
        break;
    default:
        alert("Неизвестное время суток");
        break;
}
const animal = prompt("Введите животное");
switch (animal) {
    case "собака":
    case "кошка":
    case "лев":
    case "слон":
    case "кит":
        alert("Млекопитающее");
        break;
    case "воробей":
    case "орел":
    case "пингвин":
    case "птица":
        alert("Птица");
        break;
    case "змея":
    case "ящерица":
    case "черепаха":
    case "крокодил":
        alert("Пресмыкающееся");
        break;
    case "лягушка":
    case "жаба":
    case "тримтон":
        alert("Земноводное");
        break;
    case "акула":
    case "окунь":
    case "щука":
    case "рыба":
        alert("Рыба");
        break;
    default:
        alert("Безпозвоночное или неизвестное существо");
        break;
}
const month = +prompt("Введите номер месяца");
switch (month) {
    case 1:
    case 2:
    case 12:
        alert("Зима");
        break;
    case 3:
    case 4:
    case 5:
        alert("Весна");
        break;
    case 6:
    case 7:
    case 8:
        alert("Лето");
        break;
    case 9:
    case 10:
    case 11:
        alert("Осень");
        break;
    default:
        alert("Неизвестная пара года");
        break;
}
const drink = prompt("Введите напиток");
switch (drink) {
    case "кофе":
    case "чай":
    case "горячий шоколад":
    case "глинтвейн":
        alert("Горячий напиток");
        break;
    case "вода":
    case "сок":
    case "газировка":
        alert("Холодный напиток");
        break;
    default:
        alert("Неизвестный напиток");
        break;
}
const num = +prompt("Введите число");
switch (true) {
    case num>0:
        alert("Положительное");
        break;
    case num == 0:
        alert("Ноль");
        break;
    case num < 0:
        alert("Отрицательное");
        break;
    default:
        alert("Не число");
        break;
}
