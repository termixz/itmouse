const db = new Dexie("HouseDB");
var map = L.map('map').setView([0,0], 1);
var marker = L.marker([0, 0]).addTo(map);
L.tileLayer('https:
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

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

const url = new URLSearchParams(window.location.search);
const id = parseInt(url.get('id'));
const view = document.getElementById('view');
const back = document.getElementById('back');

back.addEventListener('click', () => window.location.href = 'index.html');

async function rates() {
    let r = await fetch('https:
    let d = await r.json();
    return d.rates;
}

async function fetchSeasonalTemps(lat, lon) {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        
        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];
        
        const url = `https:
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.daily || !data.daily.temperature_2m_mean) {
            throw new Error("Нет данных");
        }
        
        const temps = data.daily.temperature_2m_mean;
        const dates = data.daily.time;
        
        const seasons = { winter: [], spring: [], summer: [], autumn: [] };
        
        for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            const month = date.getMonth();
            const temp = temps[i];
            if (month === 11 || month === 0 || month === 1) seasons.winter.push(temp);
            else if (month >= 2 && month <= 4) seasons.spring.push(temp);
            else if (month >= 5 && month <= 7) seasons.summer.push(temp);
            else seasons.autumn.push(temp);
        }
        
        const avg = (arr) => arr.length ? (arr.reduce((a,b) => a+b,0) / arr.length).toFixed(1) : "Н/Д";
        
        return {
            winter: avg(seasons.winter),
            spring: avg(seasons.spring),
            summer: avg(seasons.summer),
            autumn: avg(seasons.autumn)
        };
    } catch (error) {
        console.error("Ошибка получения температур:", error);
        return null;
    }
}

async function show() {
    try {
        let house = await db.houses.get(id);
        let cur = localStorage.getItem('valuta');
        if (!cur) cur = 'BYN';
        let r = await rates();
        let rate = r[cur] ? r[cur] : 1;

        if (house == null) {
            view.innerHTML = '<h1>Не найдено</h1>';
            return;
        }

        let price = (parseFloat(house.price) * rate).toFixed(0);
        let pics = '';
        if (house.photos && house.photos.length) {
            house.photos.forEach(p => {
                pics += `<img src="${p}" style="max-width:300px; height:200px; object-fit:cover; margin:10px; border-radius:8px;">`;
            });
        }
        const urlGeo = `https:
        let lat = null, lon = null;
        try {
            const response = await fetch(urlGeo);
            const data = await response.json();
            if (data.length > 0) {
                lat = data[0].lat;
                lon = data[0].lon;
                map.setView([lat, lon], 19);
                marker.setLatLng([lat, lon]);
                marker.bindPopup(house.address).openPopup();
            } else {
                console.log("No results found");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        
        const currentUser = localStorage.getItem('currentUser');
        let isOwner = false;
        if (currentUser && house.owner === currentUser) {
            isOwner = true;
        }
        
        
        let buyBtn = '';
        if (!currentUser) {
            buyBtn = `<p style="color:red; margin-top:20px;">Авторизуйтесь</p>`;
        } else if (isOwner) {
            buyBtn = `<p style="color:orange; margin-top:20px;">Вы владелец этого дома</p>`;
        } else if (house.sold) {
            buyBtn = `<p style="color:gray; margin-top:20px;">Дом не продаётся</p>`;
        } else {
            buyBtn = `<button id="buy" style="margin-top:20px; padding:15px; background:#28a745; color:white; border:none; border-radius:8px; width:100%; cursor:pointer;">Купить</button>`;
        }
        
        view.innerHTML = `
            <h1>${house.nameann}</h1>
            <h2 style="color:#007bff;">${price} ${cur}</h2>
            <div style="display:flex; flex-wrap:wrap;">${pics}</div>
            <div style="background:#fff; padding:20px; border-radius:12px; max-width:600px;">
                <p><strong>Адрес дома:</strong> ${house.address}</p>
                <p><strong>Описание дома:</strong> ${house.last}</p>
                <p><strong>Размер участка:</strong> ${house.square1}</p>
                <p><strong>Размер дома:</strong> ${house.square2}</p>
                <p><strong>Год постройки:</strong> ${house.year}</p>
                <p><strong>Материал стен:</strong> ${house.m1 || "N/D"}</p>
                <p><strong>Материал крыши:</strong> ${house.m2 || "N/D"}</p>
                <hr>
                <h3>Контакты</h3>
                <p><strong>ФИО:</strong> ${house.name}</p>
                <p><strong>Телефон:</strong> ${house.ph}</p>
                <p><strong>Email:</strong> ${house.em}</p>
                <p><strong>Агентство:</strong> ${house.ag || "Собственник"}</p>
                ${buyBtn}
            </div>
        `;

        const seasonDiv = document.getElementById('season-temps');
        if (lat && lon) {
            const temps = await fetchSeasonalTemps(lat, lon);
            if (temps) {
                seasonDiv.innerHTML = `
                    <p>Зима: ${temps.winter}°C</p>
                    <p>Весна: ${temps.spring}°C</p>
                    <p>Лето: ${temps.summer}°C</p>
                    <p>Осень: ${temps.autumn}°C</p>
                `;
            } else {
                seasonDiv.innerHTML = "<p>Данные о температуре не найдены</p>";
            }
        } else {
            seasonDiv.innerHTML = "<p>Не удалось определить координаты для погоды</p>";
        }

        if (currentUser && !isOwner && !house.sold) {
            const buyButton = document.getElementById('buy');
            if (buyButton) {
                buyButton.addEventListener('click', async () => {
                    let buyer = await db.users.where('login').equals(currentUser).first();
                    if (!buyer.purchased) buyer.purchased = [];
                    if (buyer.purchased.includes(id)) {
                        alert("У вас уже есть этот дом");
                        return;
                    }
                    let cost = parseFloat(house.price);
                    if (buyer.balance >= cost) {
                        
                        let oldOwner = null;
                        if (house.owner) {
                            oldOwner = await db.users.where('login').equals(house.owner).first();
                        }
                        
                        
                        buyer.balance -= cost;
                        buyer.purchased.push(id);
                        await db.users.put(buyer);
                        
                        
                        if (oldOwner && oldOwner.purchased) {
                            oldOwner.purchased = oldOwner.purchased.filter(pid => pid !== id);
                            await db.users.put(oldOwner);
                        }
                        
                        
                        await db.houses.update(id, { 
                            sold: true, 
                            owner: currentUser
                        });
                        
                        alert("Поздравляем с покупкой!");
                        window.location.href = 'profile.html';
                    } else {
                        alert("Недостаточно средств!");
                    }
                });
            }
        }
    } catch(e) {
        console.error(e);
        view.innerHTML = '<h1>Ошибка</h1>';
    }
}

document.addEventListener('DOMContentLoaded', show);
