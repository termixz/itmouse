var side = +prompt("Введите сторону квадрата");
while(side < 0 || isNaN(side) || side == null){
    alert("Вы ввели некоректное значение");
    var side = +prompt("Введите сторону квадрата");
}
var code = 1234;
alert(`Площадб квадрата = ${side * side}`);
for(i = 2; i >= 1;i-- ){
    var codef = prompt("Угадайте код");
    while(isNaN(codef) || codef.length != 4){
        alert("Вы ввели некоректное значение");
        var codef = prompt("Угадайте код");
    }
    if(code == +codef){
        alert("Код угадан - сейф открыт");
        var p = 0; 
        break;
    } 
    alert(`Угадаваемый код ${code > +codef ? "больше" : "меньше"} введённого`);

    alert(`Осталось ${i} попыток`);
}
if(!p){
    "Попытки закончились - сейф заблокирован"
}
