const strnum = String(prompt("Введите число: "));
console.log(`'${strnum}' (тип = ${typeof strnum}) преобразованое в  ${Number(strnum)} (тип = ${typeof Number(strnum)})`);

const num = 234;
console.log(`${num} (тип = ${typeof num}) преобразовано в  '${String(num)}' (тип = ${typeof String(num)})`);

const strnumprobel = String(prompt("Введите число с пробелами: "));
console.log(`'${strnumprobel}' (тип = ${typeof strnumprobel}) преобразованое в  ${Number(strnumprobel)} (тип = ${typeof Number(strnumprobel)})`);

const strnumletters = String(prompt("Введите число с текстом: "));
console.log(`'${strnumletters}' (тип = ${typeof strnumletters}) преобразованое в  ${parseInt(strnumletters)} (тип = ${typeof parseInt(strnumletters)})`);

const width = 10;
const height = 20;

alert(`Площадь прямоугольника с шириной: 10см и длинной: 20см = ${width * height}см²`);
