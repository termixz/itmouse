const num = 23;
if (num % 2 == 0){
    alert("Четное");
} else{
    alert("Нечетное");
}

const age = +prompt("Write your age: ");
if (age >= 18){
    alert("Вы совершеннолетний");
}else{
    alert("Вы несовершеннолетний");
}

const grade = 50;
if (grade >=90 && grade <= 100){
    alert("Отлично");
} else if (grade >=75 && grade <= 89){
    alert("Хорошо");
} else if (grade >=60 && grade <= 74){
    alert("Удовлетворительно");
} else{
    alert("Плохо");
}
const day = prompt("Write day of week: ");
if (day == "суббота" && day == "воскресение"){
    alert("Dayoff");
} else{
    alert("Not dayoff");
}

const number = 4;
if (number == 0){
    alert("Is ziro");
} else if (number > 0){
    alert("+");
} else{
    alert("-");
}

const time = 7;
if (time >=6 && time <=11){
    alert("Утро");
} else if (time >=12 && time <=17){
    alert("День");
}else if (time >=18 && time <=21){
    alert("Вечер");
} else{
    alert("Ночь");
}

const year = 2026;
if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
    alert("Високосный");
} else{
    alert("Невисокосный");
}

const summ = prompt("Ведитите сумму покупки: ");
if (summ > 1000){
    alert("Скидка 10%");
}else{
    alert("Скидки нету");
}

const fur = prompt("У животного есть мех? (true/false)").toLowerCase() === "true";
const fly = prompt("Оно умеет летать? (true/false)").toLowerCase() === "true";
const water = prompt("Оно живет в воде? (true/false)").toLowerCase() === "true";
const big = prompt("Оно большое? (true/false)").toLowerCase() === "true";

let result = "";


if (fur && fly && water && big) {
    result = "Неизвестное существо";
} else if (fur && fly && water && !big) {
    result = "Неизвестное существо";
} else if (fur && fly && !water && big) {
    result = "Неизвестное существо";
} else if (fur && fly && !water && !big) {
    result = "Летучая мышь";
} else if (fur && !fly && water && big) {
    result = "Морж";
} else if (fur && !fly && water && !big) {
    result = "Утконос";
} else if (fur && !fly && !water && big) {
    result = "Медведь";
} else if (fur && !fly && !water && !big) {
    result = "Кот";
} else if (!fur && fly && water && big) {
    result = "Морской дракон";
} else if (!fur && fly && water && !big) {
    result = "Летучая рыба";
} else if (!fur && fly && !water && big) {
    result = "Орел";
} else if (!fur && fly && !water && !big) {
    result = "Синица";
} else if (!fur && !fly && water && big) {
    result = "Синий кит";
} else if (!fur && !fly && water && !big) {
    result = "Окунь";
} else if (!fur && !fly && !water && big) {
    result = "Слон";
} else {
    result = "Змея";
}
console.log("--- Характеристики ---");
console.log(`Мех: ${fur}`);
console.log(`Полет: ${fly}`);
console.log(`Вода: ${water}`);
console.log(`Размер: ${big}`);
console.log("-----------------------");
console.log(`Результат: Это ${result}!`);
