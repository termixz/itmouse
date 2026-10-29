const num = +prompt("Введите число: ");
if(num % 2 == 0){
    alert("Четное");
} else {
    alert("Нечетное");
}

const num1 = +prompt("Введите число №1: ");
const num2 = +prompt("Введите число №2: ");
if(num1 > num2){
    alert(num1);
} else if (num2 > num1) {
    alert(num2);
} else {
    alert(`${num1} = ${num2}`);
}
const day = +prompt("Введите день недели по номеру: ");
switch(day){
    case 1:
        alert("Понедельник");
        break;
    case 2:
        alert("Вторник");
        break;
    case 3:
        alert("Среда");
        break;
    case 4:
        alert("Четверг");
        break;
    case 5:
        alert("Пятница");
        break;
    case 6:
        alert("Суббота");
        break;
    case 7:
        alert("Воскресение");
        break;
    default:
        alert("Некоректное число");
        break;
}
const numb1 = +prompt("Введите число №1: ");
const numb2 = +prompt("Введите число №2: ");
alert(`${(numb1 > numb2) ? "Первое" : (numb2 > numb1) ? "Второе": "Числа равны нету"} число больше`);
const numb = +prompt("Введите дробное число: ");
alert(parseInt(numb));
const letter = prompt("Введите букву: ");
switch(letter){
    case 'а':
        alert("Гласная");
        break;
    case 'у':
        alert("Гласная");
        break;
    case 'е':
        alert("Гласная");
        break;
    case 'ы':
        alert("Гласная");
        break;
    case 'о':
        alert("Гласная");
        break;
    case 'э':
        alert("Гласная");
        break;
    case 'я':
        alert("Гласная");
        break;
    case 'и':
        alert("Гласная");
        break;
    case 'ю':
        alert("Гласная");
        break;
    default:
        alert("Согласная");
        break;
}
const grade = +prompt("введите оценку");
alert(grade > 60 ? "Успешно" : "Неуспешно");
const number = +prompt("Введите число");
alert(number * number)
const number1 = +prompt("Введите число №1 ");
const number2 = +prompt("Введите число №2");
const number3 = +prompt("Введите число №3");
if (number1 <= number2 <= number3){
    alert(number1);
} else if (number2 <= number3 <= number1){
    alert(number2);
} else if (number3 <= number2 <= number1){
    alert(number3);
} 
const nums = +prompt("Введите число 1-5");
switch(nums){
    case 1:
        alert("I");
        break;
    case 2:
        alert("II");
        break;
    case 3:
        alert("III");
        break;
    case 4:
        alert("IV");
        break;
    case 5:
        alert("V");
        break;
    default:
        alert("Некоректное число");
        break;
}
