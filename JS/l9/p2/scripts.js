const students = {
    student1: {name: "Alexay", math: 85, physics: 78},
    student2: {name: "Maria", math: 92, physics: 88},
    student3: {name: "Ivan", math: 76, physics: 90},
    student4: {name: "Alena", math: 95, physics: 82}
}
let highestMathScore = 0;
let topStudent = "";
for(let student in students){
    if(students[student].math > highestMathScore){
        highestMathScore = students[student].math;
        topStudent = students[student].name;
    }
};
alert(`Самый лучший ученик - ${topStudent}, его оценка - ${highestMathScore}`);
const products = {
    product1: {name: "Ноутбук", price: 800, quantity: 5},
    product2: {name: "Сматрфон", price: 600, quantity: 20},
    product3: {name: "Планшет", price: 300, quantity: 8},
    product4: {name: "Наушники", pricr: 150, quantity: 20}
}
let highestPriceName = 0;
let highestPrice = "";
function findTopProduct(products){
    for(let product in products){
    if(products[product].price * products[product].quantity > highestPrice){
        highestPrice = products[product].price * products[product].quantity;
        highestPriceName = products[product].name;
    }
};
};
findTopProduct(products)
alert(`Самый дорогой продукт - ${highestPriceName}, его общая цена - ${highestPrice}`);
