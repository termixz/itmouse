const a = +prompt("Введите первое число");
const b = +prompt("Введите второе число");
const c = +prompt("Введите третье число");
alert(`Среднее арифметическое ваших чисел = ${(a + b + c) / 3}`);

const num1 = 10;
const num2 = 5;
const remainder = 10 % 5;
alert(remainder);

const z = +prompt("Введите первое число");
const x = +prompt("Введите второе число");
const y = +prompt("Введите третье число");
const result1 = (z + x) * y;
const result2 = (x - y) / z;
alert(`result1 = ${result1}, result2 = ${result2}`);

const celsius = +prompt("Введите темпиратуру(целсия): ");
const fahrenheit = (celsius * 9/5) + 32;
alert(`Ваша темпиратура в градусах по фаренгейту = ${fahrenheit}`);

const g = prompt("Введите первое число");
const f = prompt("Введите второе число");
const t = prompt("Введите третье число");
const gft = g + f + t;
alert(+gft * 100);

const num = +prompt("Введите трех значное число: ");
console.log("=== ПЕРЕВОРОТ ТРЁХЗНАЧНОГО ЧИСЛА ===");
console.log(`Исходное число: ${num}`);
console.log("РЕЗУЛЬТАТ:");
console.log(`Исходное число: ${num}`);
const numb1 = parseInt(num / 100);
const numb2 = parseInt(num % 100 / 10);
const numb3 = parseInt(num % 10);
console.log(`Цифры:  ${numb1}, ${numb2}, ${numb3}`);
console.log(`Перевернутое число: ${String(numb3) + String(numb2) +String(numb1)}`);
