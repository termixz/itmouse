const db = new Dexie("HouseDB");

db.version(1).stores({ houses: '++id, nameann, name, ph, photos' });
db.version(2).stores({ houses: '++id, nameann, name, ph, photos', users: '++id, login, password' });
db.version(3).stores({
    houses: '++id, nameann, name, ph, photos',
    users: '++id, login, password, balance, avatar, purchased'
});
db.version(4).stores({
    houses: '++id, nameann, name, ph, photos, sold, owner',
    users: '++id, login, password, balance, avatar, purchased'
});

const login = window.localStorage.getItem('currentUser');
const nameSpan = document.getElementById('name');
const balanceSpan = document.querySelector('#balance');
const avatarImg = document.getElementById('profile-avatar');
const urlInp = document.getElementById('url');
const saveBtn = document.getElementById('save');
const listDiv = document.getElementById('list');
const modalDiv = document.getElementById('modal');
let me = null;

async function load() {
    if (login == null) {
        nameSpan.innerText = "Гость";
        return;
    }
    me = await db.users.where('login').equals(login).first();
    if (!me) {
        nameSpan.innerText = "Не найден";
        return;
    }
    nameSpan.innerText = me.login;
    balanceSpan.innerText = me.balance || 0;
    if (me.avatar) avatarImg.src = me.avatar;
    await show();
}

async function show() {
    listDiv.innerHTML = '';
    if (!me.purchased || me.purchased.length < 1) {
        listDiv.innerHTML = '<p>Нет купленных домов</p>';
        return;
    }
    
    
    let validPurchased = [];
    for (let i = 0; i < me.purchased.length; i++) {
        let id = me.purchased[i];
        let house = await db.houses.get(id);
        if (house) {
            validPurchased.push(id);
        }
    }
    if (validPurchased.length !== me.purchased.length) {
        me.purchased = validPurchased;
        await db.users.put(me);
    }

    for (let i = 0; i < me.purchased.length; i++) {
        let id = me.purchased[i];
        let house = await db.houses.get(id);
        if (house) {
            let card = document.createElement('div');
            card.className = 'house-card';
            let img = '<div class="no-photo">Нет фото</div>';
            if (house.photos && house.photos[0]) {
                img = `<img src="${house.photos[0]}" style="width:100%; height:150px; object-fit:cover;">`;
            }
            
            
            const statusText = house.sold ? "Не продаётся" : "На продаже";
            const relistText = house.sold ? "Выставить на продажу" : "Снять с продажи";
            
            card.innerHTML = `
                ${img}
                <div class="house-info">
                    <h4>${house.nameann}</h4>
                    <p style="font-size:12px; color:${house.sold ? '#dc3545' : '#28a745'};">${statusText}</p>
                    <button class="relist" style="width:100%; margin-top:10px; padding:8px; background:#007bff; color:white; border:none; border-radius:4px;">${relistText}</button>
                </div>
            `;
            card.addEventListener('click', (e) => {
                if (e.target.className !== 'relist') window.location.href = `house.html?id=` + house.id;
            });
            const relistBtn = card.querySelector('.relist');
            if (relistBtn) {
                relistBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    
                    const newSold = !house.sold;
                    await db.houses.update(house.id, { sold: newSold });
                    alert(newSold ? "Дом снят с продажи" : "Дом выставлен на продажу");
                    await show(); 
                });
            }
            listDiv.appendChild(card);
        }
    }
}

saveBtn.addEventListener('click', async () => {
    let url = urlInp.value.trim();
    if (url) {
        me.avatar = url;
        await db.users.put(me);
        avatarImg.src = url;
        urlInp.value = '';
    }
});

const exitBtn = document.getElementById('exit');
if (exitBtn) {
    exitBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

const topupBtn = document.getElementById('topup');
if (topupBtn) {
    topupBtn.addEventListener('click', () => modalDiv.classList.add('open'));
}

const closeModalBtn = document.getElementById('close');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modalDiv.classList.remove('open'));
}

const cheatBtn = document.getElementById('cheat');
if (cheatBtn) {
    cheatBtn.addEventListener('click', async () => {
        let sum = +document.getElementById('sum').value;
        if (sum > 0) {
            me.balance = parseInt(me.balance || 0) + sum;
            await db.users.put(me);
            balanceSpan.innerText = me.balance;
            document.getElementById('sum').value = '';
            modalDiv.classList.remove('open');
        }
    });
}

const backBtn = document.getElementById('back');
if (backBtn) {
    backBtn.addEventListener('click', () => window.location.href = 'index.html');
}

document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.house-card').forEach(card => {
        let rect = card.getBoundingClientRect();
        let inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (inside) {
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let rx = (y - rect.height/2) / 10;
            let ry = (rect.width/2 - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
        } else {
            card.style.transform = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', load);
