function isEven(num){
    if(num % 2 == 0){
        return true;
    }else{
        return false;
    }
}
alert(isEven(10));
function sumToN(num){
    let counter = 0;
    for(let i = 0;i <= num;i++){
        counter += i;
    }
    return counter;
}
alert(sumToN(10));
function findMax(num,num2){
    if(num >= num2){
        return num;
    }else{
        return num2;
    }
}
function findMin(num,num2){
    if(num <= num2){
        return num;
    }else{
        return num2;
    }
}
alert(findMax(10,9));
function multiplicationTable(num){
    for(let i = 1;i <= 10;i++){
        console.log(`${num} * ${i} = ${num*i}`)
    }
}
multiplicationTable(5);
function sumEvenNumbers(num){
    let counter = 0;
    for(let i = 0;i <= num;i++){
        if(i % 2 == 0){
            counter += i;
        }
    }
    return counter;
}
alert(sumEvenNumbers(10));
function growFlower(days){
    let hight = 1;
    for(let i = 1;i <= days;i++){
        if(i >= 1 && i <= 3){
            hight += 3
        }else if(i >= 4 && i <= 6){
            hight += 2
        }else if(i >= 7 && i <= 10){
            hight += 1
        } else{
            continue
        }
    }
    console.log("ЦВЕТОК");
    console.log(`Количество дней: ${days}`);
    console.log(`Начальная высота: 1 см`);
    console.log("==================================");
    console.log("РЕЗУЛЬТАТ:");
    console.log(`Финальная высота: ${hight} см`);
    console.log(`Стадия: ${(hight < 5) ? "Росток" : (hight >= 5 && hight <= 10) ? "Стебель" : (hight >= 10 && hight <= 15) ? "Бутон" : "Цветок"}`);
    console.log(`Общий рост: +${hight - 1} см`);
    console.log(`Хорошо! Появился ${(hight < 5) ? "Росток" : (hight >= 5 && hight <= 10) ? "Стебель" : (hight >= 10 && hight <= 15) ? "Бутон" : "Цветок"}!`);
}
growFlower(5);
function factorial(n){ 
    if(n == 1){
        return 1;
    }
    return factorial(n-1) * n;
}
alert(factorial(5));
function nod(n1,n2){ 
    let nod = 1;
    let min = findMin(n1,n2);
    for(let i = 1;i <= min;i++){
        if(n1 % i == 0 && n2 % i == 0 && i > nod){
            nod = i;
        }
    }
    return nod;
}
alert(nod(128,342));
function rev(n, acc = ''){ 
    if(n == 0){
        return acc;
    }
    return rev(parseInt(n/10), acc + n % 10);
}
alert(rev(14352));
