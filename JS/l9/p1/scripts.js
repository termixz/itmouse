let person = {
    name: "Joan",
    age: 22
};
person.greet = function(){
    alert(`Привет, меня зовут ${this.name} и мне ${this.age}.`);
};
person.greet();
let circle = {
    radius: 20
};
circle.area = function(){
    alert(this.radius * this.radius * 3.14)
};
circle.area();
let car = {
    make: "Tesla",
    model: "Model X",
    year: 2019
};
car.getInfo = function(){
    console.log(`Марка машины: ${this.make}`);
    console.log(`Модель машины: ${this.model}`);
    console.log(`Год машины: ${this.year}`);
};
car.getAge = function(){
    console.log(`Возраст машины: ${2026 - this.year}`);
};
car.getInfo();
car.getAge();
let calculator = {
    a: 0,
    b: 0,
    read(a,b){
        this.a = a
        this.b = b
    },
    sum(){
        return this.a+this.b;
    },
    mul(){
        return this.a*this.b;
    }
};
calculator.read(10,10);
alert(calculator.sum());
alert(calculator.mul());
