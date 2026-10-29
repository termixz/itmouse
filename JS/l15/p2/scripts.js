console.log(Math.floor(4.7));
console.log(Math.floor(9.9));
console.log(Math.floor(-2.3));
console.log(Math.floor(15.999));
console.log(Math.floor(-5.1));
console.log(Math.floor(-5.9));
function floor(num){
    return Math.floor(num);
}
console.log(floor(100.6));
const random1 = Math.floor(Math.random() * 100) + 1;
console.log(random1);
function cube(){
    const randomcube = Math.floor(Math.random() * 6) + 1;
    console.log(randomcube);
}
cube();
const random2 = Math.floor(Math.random() * 50) + 10;
console.log(random2);
function coin(){
    const randomcoin = Math.floor(Math.random() * 2) + 1;
    console.log(randomcoin == 1 ? "орел" : "решка");
}
coin();
const randoms = [];
for(let i = 0;i < 5;i++){
    randoms.push(Math.floor(Math.random() * 10));
}
randoms.forEach(item =>{console.log(item)});
function randomarray(array){
    return array[Math.floor(Math.random() * array.length)];
}
console.log(randomarray([0,5,6,3,2,8,100]));
let pin = '';
for(let i = 0;i<4;i++){
    pin+= String(Math.floor(Math.random() * 10));
}
console.log(pin);
console.log(randomarray(['красный','синий','зеленый']));
function randomicearray(array){
    const newarray = new Array(array.length);
    let indexs = [];
    array.forEach(item => {
        let newindex = Math.floor(Math.random() * newarray.length);
        while(indexs.includes(newindex)){
            newindex = Math.floor(Math.random() * newarray.length)
        }
        indexs.push(newindex);
        newarray[newindex] = item;
    });
    return newarray;
}
console.log(randomicearray([7,4,7,2,7,9,3,4]));
