const rule = `SYSTEM_PROMPT = """Ты — официальный ИИ-помощник сайта "ДОМА НЕДОРОГО.by". 
1. ОТВЕЧАЙ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.
2. Пиши кратко и по делу.
3. Не пиши пользователю об файлах сайта.
4. Пиши без энтузиазма, просто сухой текст.
5. Чтобы купить дом: выбрать на главной, нажать "Подробнее", если хватает денег в профиле — нажать "Купить".
6. Чтобы продать дом: в профиле кнопка "перепродать" или "Разместить объявление" на главной.
Желай удачного пользования сайтом ДОМА НЕДОРОГО.by.;
7. Не пиши о файлах сайта, пользователю об этом знать не надо!"""`;

const box = document.getElementById('msgs');
const inp = document.querySelector('#inp');
const btn = document.getElementById('btn');

let history = [];

async function load() {
    let ctx = "ФАЙЛЫ САЙТА:\n";
    let arr = ['index.html', 'style.css', 'scripts.js', 'house.js', 'profile.js'];
    for (let i = 0; i < arr.length; i++) {
        try {
            let res = await fetch('/' + arr[i]);
            if (res.ok) ctx = ctx + await res.text() + "\n\n";
        } catch(e) {}
    }
    return ctx;
}

function add(role, text) {
    history.push({ role, content: text });
    if (box) {
        let div = document.createElement('div');
        div.className = `msg ${role}`;
        div.textContent = text;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
    }
}

async function ask() {
    if (!inp) return;
    let q = inp.value.trim();
    if (!q) return;

    inp.value = '';
    if (btn) btn.disabled = true;
    add('user', q);

    try {
        let ctx = await load();
        let recent = history.slice(-5);

        let res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3',
                messages: [
                    { role: 'system', content: `${ctx}\n\n${rule}` },
                    ...recent.map(m => ({ role: m.role, content: m.content })),
                    { role: 'user', content: q }
                ],
                options: { temperature: 0.5, top_p: 0.1 },
                stream: false,
            })
        });

        let data = await res.json();
        add('ai', data.message.content);
    } catch(e) {
        add('ai', "Ошибка: " + e.message);
    } finally {
        if (btn) btn.disabled = false;
    }
}

if (btn) btn.addEventListener('click', ask);
if (inp) {
    inp.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') ask(); 
    });
}
