function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.introduce = function(){
        alert(`Привет, меня зовут ${this.name}, мне ${this.age} лет и я ${this.gender}.`);
    };
}
let joan = new Person("Joan", 22, "male");
joan.introduce();
function Book(title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function(){
        alert(`Название: ${this.title}, Автор: ${this.author}, Год: ${this.year}.`);
    };
}
let potter = new Book("Garry Potter", "J.K. Rowling", "1997 - 2007");
potter.getSummary();
function Car(make, model, year, mileage){
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
    this.getInfo = function(){
        alert(`Марка: ${this.make}, Модель: ${this.model}, Год выпуска: ${this.year}, Пробег: ${this.mileage}`);
    };
    this.drive = function(){
        this.mileage+= 50;
    };
}
let tesla = new Car("Tesla", "Model X", 2019, 100);
tesla.getInfo();
tesla.drive();
tesla.getInfo();
function Student(name, age, grades){
    this.name = name;
    this.age = age;
    this.grades = grades;
    let sum = 0;
    this.getAverageGrade = function(){
        for(let i = 0;i < this.grades.length;i++){
            sum += this.grades[i];
        };
        alert(sum / this.grades.length);
    };
}
let stude = new Student("Jon", 15, [80,90,30,40,80]);
stude.getAverageGrade();
function Circle(radius){
    this.radius = radius;
    this.getArea = function(){
        alert((this.radius * this.radius * Math.PI).toFixed(2))
    };
    this.getCircumference = function(){
        alert((this.radius * Math.PI).toFixed(2))
    };
}
let circle = new Circle(5);
circle.getArea();
circle.getCircumference();
