const db = new Dexie("HelpDB");
db.version(1).stores({ history: '++id, role, content, timestamp' });

const rule = `SYSTEM_PROMPT = """Ты — официальный ИИ-помощник сайта "ДОМА НЕДОРОГО\u200b.by". 
1. ОТВЕЧАЙ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.
2. Пиши кратко и по делу.
3. Не пиши пользователю об файлах сайта.
4. Пиши без энтузиазма, просто сухой текст.
5. Чтобы купить дом: выбрать на главной, нажать "Подробнее", если хватает денег в профиле — нажать "Купить".
6. Чтобы продать дом: в профиле кнопка "перепродать" или "Разместить объявление" на главной.
Желай удачного пользования сайтом ДОМА НЕДОРОГО\u200b.by.;
7. Не пиши о файлах сайта, пользователю об этом знать не надо!"""`;
const box = document.getElementById('msgs');
const inp = document.querySelector('#inp');
const btn = document.getElementById('btn');

async function load() {
    let ctx = "ФАЙЛЫ САЙТА:\n";
    let arr = ['index.html', 'style.css', 'scripts.js', 'house.js', 'profile.js'];
    for (let i = 0; i < arr.length; i++) {
        try {
            let res = await fetch(arr[i]);
            if (res.ok) ctx = ctx + await res.text() + "\n\n";
        } catch(e) {}
    }
    return ctx;
}

async function add(role, text) {
    await db.history.add({ role, content: text, timestamp: new Date().getTime() });
    let div = document.createElement('div');
    div.className = `msg ${role}`;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

async function ask() {
    let q = inp.value.trim();
    if (q == false) return;

    inp.value = '';
    btn.disabled = true;
    await add('user', q);

    try {
        let ctx = await load();
        let old = await db.history.orderBy('timestamp').reverse().limit(5).toArray();
        let hist = old.reverse();

        let res = await fetch('http://127.0.0.1:11436/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3',
                messages: [
                    { role: 'system', content: `${ctx}\n\n${rule}` },
                    ...hist.map(m => ({ role: m.role, content: m.content })),
                    { role: 'user', content: q }
                ],
                options: { temperature: 0.5, top_p: 0.1 },
                stream: false,
            })
        });

        let data = await res.json();
        await add('ai', data.message.content);
    } catch(e) {
        await add('ai', "Ошибка: " + e.message);
    } finally {
        btn.disabled = false;
    }
}

btn.addEventListener('click', ask);
inp.addEventListener('keypress', (e) => { if (e.key == 'Enter') ask(); });

document.addEventListener('DOMContentLoaded', async () => {
    let all = await db.history.orderBy('timestamp').toArray();
    all.forEach(m => {
        let div = document.createElement('div');
        div.className = "msg " + m.role;
        div.textContent = m.content;
        box.appendChild(div);
    });
});
