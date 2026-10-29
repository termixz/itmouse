const phrases = [
  "Привет!",
  "Как дела?",
  "Интересно",
  "Расскажи ещё",
  "Я робот",
  "Понимаю",
  "Что нового?",
  "Ясно",
  "Звучит круто",
  "Продолжай"
];

const box = document.getElementById('msgs');
const sumb = document.getElementById('btn');
const msginp = document.getElementById('inp');
const clear = document.getElementById('clear');
let msgs = JSON.parse(localStorage.getItem('msgs')) || [];

function renderMessage(text, type) {
  let div = document.createElement('div');
  div.className = `msg ${type}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

sumb.addEventListener('click', () => {
  const userText = msginp.value.trim();
  
  if (userText !== '') {
    const time = new Date().toLocaleTimeString();
    const userMsg = `${time} Вы: ${userText}`;
    
    msgs.push(userMsg);
    renderMessage(userMsg, 'user');
    msginp.value = '';

    setTimeout(() => {
      const botPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      const botMsg = `${new Date().toLocaleTimeString()} Бот: ${botPhrase}`;
      
      msgs.push(botMsg);
      renderMessage(botMsg, 'ai');
      
      localStorage.setItem('msgs', JSON.stringify(msgs));
    }, 500);

    localStorage.setItem('msgs', JSON.stringify(msgs));
  }
});

function show() {
  msgs.forEach(msg => {
    const type = msg.includes('Вы:') ? 'user' : 'ai';
    renderMessage(msg, type);
  });
}

show();
clear.addEventListener('click',() =>{
    box.innerHTML = '';
    localStorage.removeItem('msgs');
    msgs = [];
});
