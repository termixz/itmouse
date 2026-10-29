function play(userChoice){
    const choices = ['камень', 'ножницы', 'бумага']
    const computerChoice = choices[Math.floor(Math.random()*choices.length)];
    const userChoiceElement = document.getElementById('user-choice');
    const computerChoiceElement = document.getElementById('computer-choice');

    if(userChoice==='камень'){
        userChoiceElement.innerText = '🗿';
    } else if(userChoice==='ножницы'){
        userChoiceElement.innerText = '✂️';
    } else{
        userChoiceElement.innerText = '📄';
    }
    if(computerChoice==='камень'){
        computerChoiceElement.innerText = '🗿';
    } else if(computerChoice==='ножницы'){
        computerChoiceElement.innerText = '✂️';
    } else{
        computerChoiceElement.innerText = '📄';
    }

    userChoiceElement.style.background = 'transparent';
    computerChoiceElement.style.background = 'transparent';
    let result = '';
    if(userChoice===computerChoice){
        result = `Ничья! Вы оба выбрали ${userChoice}`;
        userChoiceElement.style.background = '#6f42c1';
        computerChoiceElement.style.background = '#6f42c1';
    } else if ((userChoice=== 'камень' && computerChoice === 'ножницы') || 
    
    (userChoice === 'ножницы' && computerChoice == 'бумага') || 

    (userChoice === 'бумага' && computerChoice === 'камень')){
        result = `Вы выйграли! ${userChoice} побеждает ${computerChoice}`;
        userChoiceElement.style.background = '#00ff2a';
        computerChoiceElement.style.background = '#ff0000';
    }else{
        result = `Вы проиграли! ${computerChoice} побеждает ${userChoice}`
        userChoiceElement.style.background = '#ff0000';
        computerChoiceElement.style.background = '#00ff2a';
    }
    document.getElementById('result').innerText = result;
    setTimeout(() => {
        userChoiceElement.style.background = 'transparent';
        computerChoiceElement.style.background = 'transparent';
    },2000

    );
}
