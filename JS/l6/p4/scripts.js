for(i = 1; i <= 10;i++){
    alert(i * i);
}
for(i = 1; i <= 10;i++){
    alert(`${i} ${i %2==0 ? "четное" : "нечетное"} число`);
}
var counter = 0;
for(i = 1; i <= 20;i++){
    if(i % 3 == 0){
        counter += i
    }
}
alert(counter);
for(i = 1; i <= 5;i++){
    let num = +prompt("Введитн число");
    if(num < 0){
        alert("число отрицательное");
    } else if(num > 0){
        alert("число положительное");
    } else{
        alert("число ноль");
    }
}
var chet = 0;
var nechet = 0;
for(i = 1; i <= 20;i++){
    if(i % 2 == 0){
        chet += i
    } else{
        nechet += i
    }
}
var numb = +prompt("Введите число");
for(i = 1; i <= 10;i++){
    alert(`${numb} * ${i} = ${numb * i}`);
}
var n = +prompt("Введите число");
var counter = 0;
for(i = 1; i <= n;i++){
    counter += i;
}
alert(counter);

var n = +prompt("Введите число");
var counter = 0;
var i = 0;
while(i <= 10){
    counter += i;
    i++
}
alert(counter);

var i = 0;
while(i <= 20){
    if(i % 2 == 0){
        alert(i)
    }
    i++
}
var i = 0;
while(i <= 20){
    if(i % 2 != 0){
        alert(i)
    }
    i++
}
var n = +prompt("Введите число");
do{
    alert(n);
    n--
}while(n > 1)
var counter = 0;
var number = +prompt("Введите число");
while(number != 0){
    var number = +prompt("Введите число");
    counter += number;
}
alert(counter);
var i = 0;
var number = +prompt("Введите число");
while(i <= number){
    console.log(String(i) * 10)
    i++
}
alert(counter);
