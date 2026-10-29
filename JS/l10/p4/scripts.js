function Vehicle(brand, model) {
    this.brand = brand;
    this.model = model;
    this.start = function() {
        alert(`${this.brand} ${this.model} начинает движение.`);
    };
    this.stop = function() {
        alert(`${this.brand} ${this.model} останавливается.`);
    };
}

function Bike(brand, model, type) {
    Vehicle.call(this, brand, model);
    this.type = type;
    this.start = function() {
        alert(`${this.brand} ${this.model} (${this.type}) начинает движение.`);
    };
}

let myBike = new Bike("Giant", "Talons", "горный");
myBike.start();
myBike.stop();

function Furniture(material, color) {
    this.material = material;
    this.color = color;
    this.getDescription = function() {
        return `Материал: ${this.material}, Цвет: ${this.color}`;
    };
}

function Chair(material, color, height) {
    Furniture.call(this, material, color);
    this.height = height;
    this.getDescription = function() {
        alert(`Материал: ${this.material}, Цвет: ${this.color}, Высота: ${this.height}`);
    };
}

function Table(material, color, size) {
    Furniture.call(this, material, color);
    this.size = size;
    this.getDescription = function() {
        alert(`Материал: ${this.material}, Цвет: ${this.color}, Размер: ${this.size}`);
    };
}

let officeChair = new Chair("Пластик", "Черный", "90см");
officeChair.getDescription();

let diningTable = new Table("Дерево", "Коричневый", "120x80");
diningTable.getDescription();

function Student(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.getInfo = function() {
        return `Имя: ${this.name}, Возраст: ${this.age}, Класс: ${this.grade}`;
    };
}

function HighSchoolStudent(name, age, grade, specialization) {
    Student.call(this, name, age, grade);
    this.specialization = specialization;
    this.getInfo = function() {
        alert(`Имя: ${this.name}, Возраст: ${this.age}, Класс: ${this.grade}, Специализация: ${this.specialization}`);
    };
}

function MiddleSchoolStudent(name, age, grade, favoriteSubject) {
    Student.call(this, name, age, grade);
    this.favoriteSubject = favoriteSubject;
    this.getInfo = function() {
        alert(`Имя: ${this.name}, Возраст: ${this.age}, Класс: ${this.grade}, Любимый предмет: ${this.favoriteSubject}`);
    };
}

let alex = new HighSchoolStudent("Алекс", 17, 11, "Математика");
alex.getInfo();

let maria = new MiddleSchoolStudent("Мария", 13, 7, "История");
maria.getInfo();


function Seed(type, germinationTime) {
    this.type = type;
    this.germinationTime = germinationTime;
    this.getInfo = function() {
        return `Тип: ${this.type}, Время прорастания: ${this.germinationTime} дней`;
    };
}

function Vegetable(type, germinationTime, color) {
    Seed.call(this, type, germinationTime);
    this.color = color;
    this.getVegetableInfo = function() {
        alert(`${this.getInfo()}, Цвет: ${this.color}`);
    };
}

function Fruit(type, germinationTime, taste) {
    Seed.call(this, type, germinationTime);
    this.taste = taste;
    this.getFruitInfo = function() {
        alert(`${this.getInfo()}, Вкус: ${this.taste}`);
    };
}

let items = [];
let count = prompt("Сколько записей вы хотите добавить?");

for (let i = 0; i < count; i++) {
    let category = prompt("Введите категорию (овощ или фрукт):").toLowerCase();
    let type = prompt("Введите тип семени:");
    let time = prompt("Введите время прорастания (в днях):");

    if (category === "овощ") {
        let color = prompt("Введите цвет овоща:");
        items.push(new Vegetable(type, time, color));
    } else if (category === "фрукт") {
        let taste = prompt("Введите вкус фрукта:");
        items.push(new Fruit(type, time, taste));
    }
}

for (let i = 0; i < items.length; i++) {
    if (items[i].getVegetableInfo) {
        items[i].getVegetableInfo();
    } else if (items[i].getFruitInfo) {
        items[i].getFruitInfo();
    }
}


function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getInfo = function() {
        return `Имя: ${this.name}, Возраст: ${this.age}`;
    };
}

function Father(name, age, carRepairSkill) {
    Person.call(this, name, age);
    this.carRepairSkill = carRepairSkill;
    this.getFatherInfo = function() {
        alert(`${this.getInfo()}, Навык: ${this.carRepairSkill}`);
    };
}

function Son(name, age, carRepairSkill, codingSkill) {
    Father.call(this, name, age, carRepairSkill);
    this.codingSkill = codingSkill;
    this.getSonInfo = function() {
        alert(`${this.getInfo()}, Навык программирования: ${this.codingSkill}`);
    };
    this.showFatherSkill = function() {
        alert(`Навык отца: ${this.carRepairSkill}`);
    };
}

let fName = prompt("Введите имя отца:");
let fAge = prompt("Введите возраст отца:");
let fSkill = prompt("Введите навык ремонта машины:");
let father = new Father(fName, fAge, fSkill);

let sName = prompt("Введите имя сына:");
let sAge = prompt("Введите возраст сына:");
let sSkill = prompt("Введите навык программирования:");
let son = new Son(sName, sAge, fSkill, sSkill);

father.getFatherInfo();
son.getSonInfo();
son.showFatherSkill();
