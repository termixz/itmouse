class Book{
    constructor(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    }
    getSummary(){
        return `Название: ${this.title}, Автор: ${this.author}, Страниц: ${this.pages}`;
    }
}
const book1 = new Book('1984', 'George Orwell', 328);
console.log(book1.getSummary());
class Student{
    constructor(name, age, grades){
    this.name = name;
    this.age = age;
    this.grades = grades;
    }
    addGrade(grade){
        this.grades.push(grade);
    }
    getAverageGrade(){
        let sr = 0;
        this.grades.forEach((element) => sr+= element);
        sr = sr / this.grades.length;
        return sr.toFixed(2);
    }
}
const student1 = new Student('Joan', 22, [70,20,40,70,90]);
student1.addGrade(80);
console.log(student1.getAverageGrade());
class Client{
    constructor(name, email, purchases){
    this.name = name;
    this.email = email;
    this.purchases = purchases;
    }
    addPurchase(item){
        this.purchases.push(item);
    }
    getPurchaseCount(){
        return this.purchases.length;
    }
    getEmail(){
        return this.email;
    }
}
const client1 = new Client('Joan', 'joansemail@gmail.com', ['Laptop','Telephone',"PC",'Video Game','Smart Watch']);
client1.addPurchase('PS5');
console.log(client1.getPurchaseCount());
console.log(client1.getEmail());
class Point{
    constructor(x, y){
    this.x = x;
    this.y = y;
    }
    getCoordinates(){
        return `x: ${this.x}, y: ${this.y}`;
    }
    move(dx, dy){
        return `x: ${this.x+(dx)}, y: ${this.y+(dy)}`;
    }
}
const point1 = new Point(5, 10);
console.log(point1.getCoordinates());
console.log(point1.move(10,-5));
class BankAccount{
    constructor(name, moneys){
    this.name = name;
    this.moneys = moneys;
    }
    addMonneys(addmoneys){
        while(addmoneys == null || addmoneys < 0 || addmoneys == undefined || addmoneys == NaN){
            alert("НЕ ПРАВЕЛЬНОE ЧИСЛО");
            addmoneys = +prompt("Введите сумму которую хотите добавить: ");
        }
        this.moneys+=addmoneys;
    }
    getMonneys(){
        return this.moneys;
    }
    takeMonneys(take){
        while(take == null || take < 0 || take == undefined || take == NaN){
            alert("НЕ ПРАВЕЛЬНОE ЧИСЛО");
            take = +prompt("Введите сумму которую хотите снять: ");
        }
        this.moneys-=take;
    }
}
const bankaccount1 = new BankAccount(prompt("Введите имя счета:"), +prompt("Введите начальную сумму:"));
let answer = 0;
while(answer != 4){
    answer = +prompt(`Выберите операцию для счёта ${bankaccount1.name} \n 1 - Просмотр баланса \n 2 - Добавить на счёт \n 3 - Снять со счёта \n 4 - Завершить работу`);
    if(answer == 1){
        alert(`Счёт: ${bankaccount1.name} \nБаланс: ${bankaccount1.getMonneys()}`);
    }
    if(answer == 2){
        bankaccount1.addMonneys(+prompt("Добавление стредств на счёт \nВведите сумму которую хотите добавить: "));
    }
    if(answer == 3){
        bankaccount1.takeMonneys(+prompt("Снимание стредств со счёта \nВведите сумму которую хотите снять: "));
    }
}
alert(`Работа завершена`);
class Employee{
    constructor(name, position, salary){
    this.name = name;
    this.position = position;
    this.salary = salary;
    }
    getInfo(){
        return `Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`;
    }
    applyRaise(percentage){
        if(percentage > 100){
            alert("Warning! Percent > 100");
            return;
        }
        this.salary = this.salary * ((100+percentage)/100);
    }
    isHighEarner(threshold){
        if(this.salary > threshold){
            return true;
        }else{
            return false;
        }
    }
}
const employee1 = new Employee('Joan', 'Manager', 500);
console.log(employee1.getInfo());
const employee2 = new Employee('Mary', 'Teacher',400);
console.log(employee2.getInfo());
if(+prompt(`Применить повышение зарплаты работнику ${employee1.name}(1/0)`)){
    employee1.applyRaise(+prompt(`Введите процент повышения зарплаты: `));
    if(employee1.isHighEarner(+prompt(`Введите порог не высокооплачевоемой работы`))){
        alert(`Работник ${employee1.name} высокооплачеваемый`);
     }else{
        alert(`Работник ${employee1.name} не высокооплачеваемый`);
     }
     console.log(employee1.getInfo());
} else if(prompt(`Применить повышение зарплаты работнику ${employee2.name}(true/false)`)){
     employee2.applyRaise(+prompt(`Введите процент повышения зарплаты: `));
     if(employee2.isHighEarner(+prompt(`Введите порог не высокооплачевоемой работы`))){
        alert(`Работник ${employee2.name} высокооплачеваемый`);
     }else{
        alert(`Работник ${employee2.name} не высокооплачеваемый`);
     }
     console.log(employee2.getInfo());
}
