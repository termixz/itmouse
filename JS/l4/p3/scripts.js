const day = prompt("Введите день недели: ");
alert(`Ваш день недели выходной?${day == "суббота" || day == "воскресение"}`);
const inStock = true;
const isPreOrder = false;
console.log(`Товар доступен к заказу - ${inStock}`);
const temperature = 30;
alert(temperature >= 0 && temperature <= 30);
const hasDrivingLicense = true;
const isOver18 = true;
alert(hasDrivingLicense && isOver18);
const number = 30;
alert(number % 2 == 0 && number>0);


const grade1 = +prompt("Введите оценку по математике: ");
const grade2 = +prompt("Введите оценку по естествознанию: ");
const grade3 = +prompt("Введите оценку по языку: ");
const grade4 = +prompt("Введите оценку по рисованию: ");
console.log("=== ДЕТЕКТИВ ШКОЛЬНЫХ ОЦЕНОК ===");
console.log("ВВЕДЕНЫ ОЦЕНКИ:");
console.log(`Математика: ${grade1}, естествознание: ${grade2}, язык: ${grade3}, рисование ${grade4}`);
console.log("Результаты расследования:");
console.log("Базовые сравнения")
console.log(`математика > естествознания: ${grade1 > grade2}`)
console.log(`рисование < языка: ${grade3 > grade4}`) 
console.log(`языка == естествознания: ${grade2 == grade3}`) 
console.log("сравнение с нормами")
console.log("все оценки три и больше:", grade1 >= 3 && grade2 >= 3 && grade3 >= 3 && grade4 >= 3);
console.log("есть пятерка: ", grade1 == 5 || grade2 == 5 || grade3 == 5 || grade4 == 5)
console.log("ни одной двойки:", grade1 >= 3 && grade2 >= 3 && grade3 >= 3 && grade4 >= 3);
console.log("есть тройка или ниже:", grade1 <= 3 || grade2 <= 3 || grade3 <= 3 || grade4 <= 3);
console.log("все пятерки:", grade1 == 5 && grade2 == 5 && grade3 == 5 && grade4 == 5);
console.log("груповое сравнение");
console.log("Точные науки лучше гуманитарных:", grade1 > grade3  && grade1 > grade4 && grade2 > grade3  && grade2 > grade4);
console.log("Специальные условия: ");
console.log("все пятерки:", grade1 == 5 && grade2 == 5 && grade3 == 5 && grade4 == 5);
console.log("есть двойки:", !(grade1 >= 3 && grade2 >= 3 && grade3 >= 3 && grade4 >= 3));
console.log("все 4:", grade1 == 4 && grade2 == 4 && grade3 == 4 && grade4 == 4);
console.log("Статистика: ");
console.log("Средний бал выше 4: ", (grade1 + grade3 + grade2 + grade4) / 4 > 4);
console.log("Есть пятерка: ", grade1 == 5 || grade2 == 5 || grade3 == 5 || grade4 == 5);


