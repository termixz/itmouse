const h1 = document.querySelector('h1');
const gen = document.getElementById('numgen');
const input = document.getElementById('numget');
const select = document.getElementById('select');
const copy = document.getElementById('copy');
let current = localStorage.getItem('current') || 'num';
refresh();
function numpasswordgen(){
    let pin = '';
    for(let i = 0;i<8;i++){
        pin+= String(Math.floor(Math.random() * 10));
    }
    input.value = pin;
}
function randomarray(array){
    return array[Math.floor(Math.random() * array.length)];
}
function passwordgen(){
    let pass = '';
    const alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    for(let i = 0;i<8;i++){
        if(Math.floor(Math.random() * 2) + 1 == 1){
            pass+= randomarray(alphabet);
        }else{
            pass+= String(Math.floor(Math.random() * 10));
        }
    }
    input.value = pass;
}
function passwordgen2(){
    let pass = '';
    const alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    const alphabetbig = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    for(let i = 0;i<8;i++){
        if(i == 0){
            pass+= randomarray(alphabetbig);
        }
        else if(Math.floor(Math.random() * 2) + 1 == 1){
            pass+= randomarray(alphabet);
        }else{
            pass+= String(Math.floor(Math.random() * 10));
        }
    }
    input.value = pass;
}
function passwordgen3(){
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const alphabetbig = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let pass = '';
    let hasNumber = false;

    while(!hasNumber) {
        pass = '';
        for(let i = 0; i < 8; i++){
            if(i === 0){
                pass += randomarray(alphabetbig);
            } else if(Math.floor(Math.random() * 2) === 0){
                pass += randomarray(alphabet);
            } else {
                pass += randomarray(nums);
            }
        }
        hasNumber = pass.split('').some(char => nums.includes(char));
    }
    
    input.value = pass;
}
function refresh(){
    if(select.value == 'num'){
        h1.textContent = "Генерация цифрового пароля";
        current = 'num';
        gen.removeEventListener('click', passwordgen);
        gen.removeEventListener('click', passwordgen2);
        gen.removeEventListener('click', passwordgen3);
        gen.addEventListener('click', numpasswordgen);
    }else if(select.value == 'gen1'){
        h1.textContent = "Генерация букво-цифренного пароля";
        current = 'gen1';
        gen.addEventListener('click', passwordgen);
        gen.removeEventListener('click', passwordgen2);
        gen.removeEventListener('click', passwordgen3);
        gen.removeEventListener('click', numpasswordgen);
    }else if(select.value == 'gen2'){
        h1.textContent = "Генерация продвинутого пароля";
        current = 'gen2';
        gen.removeEventListener('click', passwordgen);
        gen.addEventListener('click', passwordgen2);
        gen.removeEventListener('click', passwordgen3);
        gen.removeEventListener('click', numpasswordgen);
    }else{
        h1.textContent = "Генерация иновационного пароля";
        current = 'gen3';
        gen.removeEventListener('click', passwordgen);
        gen.removeEventListener('click', passwordgen2);
        gen.addEventListener('click', passwordgen3);
        gen.removeEventListener('click', numpasswordgen);
    }
    localStorage.setItem('current', current);
}
select.addEventListener('change', refresh);
select.addEventListener('change', function(){input.value = ''});
copy.addEventListener('click', function(){navigator.clipboard.writeText(input.value)})
