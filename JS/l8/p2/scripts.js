const book = {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967
};

console.log(book.title);
console.log(book.author);

const car = {
    make: "Тесла",
    model: "Модель S",
    year: 2023
};

console.log(`Марка: ${car.make}, Модель: ${car.model}, Год: ${car.year}`);

const student = {
    name: "Иван Иванов",
    age: 20,
    grades: [5, 4, 5, 3, 5]
};

console.log(student.name);
console.log(student.grades);

const movie = {
    title: "Интерстеллар",
    director: "Кристофер Нолан",
    rating: 8.6
};

console.log(`Фильм: ${movie.title}, Режиссер: ${movie.director}, Рейтинг: ${movie.rating}`);

const person = {
    name: "Алиса",
    age: 25,
    address: {
        street: "Ленина",
        city: "Москва"
    }
};

console.log(`${person.address.street}, ${person.address.city}`);
const students = {
    "Иван": 85,
    "Мария": 95,
    "Алексей": 90
};

let highestMathScore = 0;
let topStudent = "";

for (let name in students) {
    if (students[name] > highestMathScore) {
        highestMathScore = students[name];
        topStudent = name;
    }
}

console.log(topStudent, highestMathScore);

const products = {
    "Ноутбук": { price: 50000, qty: 5 },
    "Смартфон": { price: 30000, qty: 10 }
};

function findTopProduct(items) {
    let maxTotal = 0;
    let topName = "";

    for (let name in items) {
        let total = items[name].price * items[name].qty;
        if (total > maxTotal) {
            maxTotal = total;
            topName = name;
        }
    }

    return topName + ": " + maxTotal;
}

console.log(findTopProduct(products));
