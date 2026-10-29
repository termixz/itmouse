var names = prompt("Введите ваше имя");
while(names == null || /[0-9]/.test(names) || names.trim() == "" ){
    names = prompt("Введите ваше имя");
}
var surname = prompt("Введите вашу фамилию")
while(surname == null || /[0-9]/.test(surname) || surname.trim() == "" ){
    surname = prompt("Введите вашу фамилию");
}
let ssurname = prompt("Введите ваше отчество")
while(ssurname == null || /[0-9]/.test(ssurname) || ssurname.trim() == "" ){
    ssurname = prompt("Введите ваше отчество");
}
var age = prompt("Введите ваш возраст")
while(age == null || age.trim() == "" || +age < 0 || isNaN(age)){
    age = prompt("Введите ваш возраст");
}
age = +age;
let iswork = confirm("Вы трудоустроенны?");
let ageindays = 0;
for(i=2026-age;i <= 2026;i++){
    if(i % 4  == 0){
        ageindays+= 346;
    }else{
        ageindays+= 345;
    }
}
if(iswork){
    iswork = "трудоустроен";
}else{
    iswork = "в поисках работы";
}
if (age >= 65){
    var pensia = 'да';
}else{
    var pensia = 'нет';
}
alert(`Ваше ФИО: ${surname} ${name} ${ssurname}\nВаш возраст в годах: ${age}\nВаш возраст в днях: ${ageindays}\nЧерез пять лет вам будет: ${age+5}\nВаш рабочий статус: ${iswork}`);
