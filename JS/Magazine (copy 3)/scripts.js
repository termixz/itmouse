db = new Dexie("HouseDB");

db.version(1).stores({ houses: '++id, nameann, name, ph, photos' });
db.version(2).stores({ houses: '++id, nameann, name, ph, photos', users: '++id, login, password' });
db.version(3).stores({
    houses: '++id, nameann, name, ph, photos',
    users: '++id, login, password, balance, avatar, purchased'
});
db.version(4).stores({
    houses: '++id, namenn, name, ph, photos, sold', 
    users: '++id, login, password, balance, avatar, purchased'
});

const apply = document.getElementById('apply-filter');
let price = document.getElementById('filter-price');
let material = document.getElementById('filter-material');
let year = document.getElementById('filter-year');
let plot = document.getElementById('filter-plot');
let houseSize = document.getElementById('filter-house-size');
let search = document.getElementById('filter-search');
const reset = document.getElementById('reset-filter');
const valuta = document.querySelector('header select');
const logo = document.getElementById('logo');
const avatar = document.getElementById('avatar');

const w1 = document.getElementById('first');
const w2 = document.getElementById('second');
const w3 = document.getElementById('third');
const w4 = document.getElementById('fourth');
const nexts = document.querySelectorAll('.next');

const n1 = nexts[0];
const n2 = nexts[1];
const n3 = nexts[2];
const n4 = nexts[3];

const addBtn = document.getElementById('new');
const filterBtn = document.querySelector('.filter');
const filterModal = document.getElementById('filter-modal');
const closeFilter = document.getElementById('close-filter');

const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');
const toggle = document.getElementById('auth-toggle');
const submit = document.getElementById('auth-submit');
const title = document.getElementById('auth-title');
const loginInp = document.getElementById('auth-login');
const passInp = document.getElementById('auth-password');
const err = document.getElementById('auth-error-general');

let mode = true; 

async function update() {
    let user = localStorage.getItem('currentUser');
    if (user) {
        let u = await db.users.where('login').equals(user).first();
        let src = (u && u.avatar) ? u.avatar : "./IMG/avatar.png";
        avatar.innerHTML = `<img src="${src}" style="width:20px; height:20px; border-radius:50%; object-fit:cover;"> Профиль`;
    } else {
        avatar.innerHTML = `<img src="./IMG/avatar.png"> Вход`;
    }
}

async function makeAdmin() {
    let exists = await db.users.where('login').equals('admin').first();
    if (exists == null) {
        await db.users.add({
            login: 'admin', password: 'admin', balance: 999999999999,
            avatar: 'https:
            purchased: []
        });
    }
}

avatar.addEventListener('click', () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'profile.html';
    } else {
        authModal.classList.add('open');
    }
});

closeAuth.addEventListener('click', () => {
    authModal.classList.remove('open');
    err.style.display = "none";
});

toggle.addEventListener('click', () => {
    mode = !mode;
    title.innerText = mode ? "Вход" : "Регистрация";
    submit.innerText = mode ? "Войти" : "Зарегистрироваться";
    toggle.innerText = mode ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти";
    err.style.display = "none";
});

submit.addEventListener('click', async () => {
    let l = loginInp.value.trim();
    let p = passInp.value.trim();
    if (!l || !p) {
        err.innerText = "Заполните поля";
        err.style.display = "block";
        return;
    }
    if (mode) {
        let u = await db.users.where('login').equals(l).first();
        if (u && u.password === p) {
            localStorage.setItem('currentUser', l);
            update();
            authModal.classList.remove('open');
            loginInp.value = '';
            passInp.value = '';
            err.style.display = "none";
        } else {
            err.innerText = "Неверно";
            err.style.display = "block";
        }
    } else {
        let exists = await db.users.where('login').equals(l).first();
        if (exists) {
            err.innerText = "Уже существует";
            err.style.display = "block";
        } else {
            await db.users.add({ login: l, password: p, balance: 0, avatar: '', purchased: [] });
            localStorage.setItem('currentUser', l);
            update();
            authModal.classList.remove('open');
            loginInp.value = '';
            passInp.value = '';
            err.style.display = "none";
        }
    }
});

filterBtn.addEventListener('click', () => filterModal.classList.add('open'));
closeFilter.addEventListener('click', () => filterModal.classList.remove('open'));

valuta.onchange = () => {
    window.localStorage.setItem('valuta', valuta.value);
    refresh();
};

reset.addEventListener('click', () => {
    price.value = '';
    material.value = '';
    year.value = '';
    plot.value = '';
    houseSize.value = '';
    search.value = '';
    refresh();
    filterModal.classList.remove('open');
});

apply.addEventListener('click', () => {
    let f = {
        maxPrice: parseFloat(price.value) || null,
        material: material.value.trim() || null,
        minYear: parseInt(year.value) || null,
        minPlot: parseFloat(plot.value) || null,
        minHouse: parseFloat(houseSize.value) || null,
        search: search.value.trim().toLowerCase() || null
    };
    refresh(f);
    filterModal.classList.remove('open');
});

n1.addEventListener('click', addHouse);
n2.addEventListener('click', addHouse);
n3.addEventListener('click', addHouse);
n4.addEventListener('click', addHouse);

addBtn.addEventListener('click', () => {
    if (!localStorage.getItem('currentUser')) {
        authModal.classList.add('open');
    } else {
        w1.style.display = 'flex';
    }
});

async function getRates() {
    const response = await fetch('https:
    const data = await response.json();
    return data.rates;
}

async function isokprice() {
    try {
        const data = await db.houses.toArray();
        if (data.length === 0) {
            document.getElementById('title').innerText = "ДОМА НЕДОРОГО.by";
            logo.setAttribute('src', './IMG/bum-logo.png');
            return;
        }
        let totalSum = 0;
        for (let i = 0; i < data.length; i++) {
            totalSum += (+data[i].price || 0);
        }
        const averagePrice = totalSum / data.length;
        
        if (averagePrice >= 1000000) {
            document.getElementById('title').innerText = "ДОМА ДОРОГО.by";
            document.querySelector('title').innerText = "Дома дорого";
            logo.setAttribute('src', './IMG/rich-logo.png');
        } else {
            document.getElementById('title').innerText = "ДОМА НЕДОРОГО.by";
            document.querySelector('title').innerText = "Дома недорого";
            logo.setAttribute('src', './IMG/bum-logo.png');
        }
    } catch (error) {}
}

function getFiles(input) {
    const files = Array.from(input.files);
    return Promise.all(files.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }));
}

let houseData = {};

function showFieldError(input, message) {
    const container = input.closest('.addHouse');
    if (container) {
        let errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList && errorDiv.classList.contains('error-msg')) {
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        } else {

            errorDiv = document.createElement('p');
            errorDiv.className = 'error-msg';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '10px';
            errorDiv.style.marginTop = '2px';
            input.insertAdjacentElement('afterend', errorDiv);
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        }
    }
}

function hideFieldError(input) {
    const container = input.closest('.addHouse');
    if (container) {
        let errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList && errorDiv.classList.contains('error-msg')) {
            errorDiv.style.display = "none";
            errorDiv.textContent = "";
        }
    }
}

async function addHouse(event) {
    let isValid = true;
    
    const validateField = async (el) => {
        hideFieldError(el);
        
        const val = el.value.trim();
        const isOptional = ['m2', 'ag', 'm1'].indexOf(el.id) !== -1;
        const digitsOnly = /^\d+$/;
        const phoneRegex = /^\+?\d{9,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let errorText = "";

        if (!isOptional && val === '') {
            errorText = "Заполните поле";
        } 
        else if (['price', 'square1', 'square2'].indexOf(el.id) !== -1 && val !== '' && !digitsOnly.test(val)) {
            errorText = "Только цифры";
        }
        else if (el.id === 'year' && val !== '') {
            if (!digitsOnly.test(val) || parseInt(val) > new Date().getFullYear()) {
                errorText = "Некорректный год";
            }
        }
        else if (el.id === 'ph' && val !== '' && !phoneRegex.test(val)) {
            errorText = "Неверный номер";
        }
        else if (el.id === 'em' && val !== '' && !emailRegex.test(val)) {
            errorText = "Неверный email";
        }
        else if (el.id === 'address' && val !== '') {
            const parts = val.split(/[\s,]+/);
            const hasHouseNumber = parts.some(part => /\d/.test(part));
            const hasStreet = parts.length >= 2;
            const hasCity = parts.length >= 1;
            
            if (!hasCity || !hasStreet || !hasHouseNumber) {
                errorText = "Неполный адрес: укажите город, улицу и номер дома (пример: Минск, Независимости 15)";
            } else {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 7000);
                    const response = await fetch(`https:
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);
                    const data = await response.json();
                    
                    if (!data || data.length === 0) {
                        errorText = "Адрес не найден на карте";
                    } else {
                        const result = data[0];
                        const addressDetails = result.address;
                        if (!addressDetails.house_number && !addressDetails.building) {
                            errorText = "Не найден номер дома";
                        } else if (!addressDetails.road && !addressDetails.street) {
                            errorText = "Не найдена улица";
                        } else if (!addressDetails.city && !addressDetails.town && !addressDetails.village) {
                            errorText = "Не найден город";
                        }
                    }
                } catch (e) {
                    errorText = "Ошибка проверки адреса";
                }
            }
        }

        if (errorText !== "") {
            showFieldError(el, errorText);
            return false;
        }
        return true;
    };

    let targetContainer = null;
    let currentBtn = event.currentTarget;
    if (currentBtn === n1) targetContainer = '#first';
    if (currentBtn === n2) targetContainer = '#second';
    if (currentBtn === n3) targetContainer = '#third';

    if (targetContainer) {
        currentBtn.disabled = true;
        const originalLabel = currentBtn.innerText;
        currentBtn.innerText = "Проверка...";

        const inputs = Array.from(document.querySelectorAll(`${targetContainer} input, ${targetContainer} textarea`));
        
        let allValid = true;
        for (const el of inputs) {
            const isOk = await validateField(el);
            if (!isOk) {
                allValid = false;
                break;
            }
        }

        currentBtn.disabled = false;
        currentBtn.innerText = originalLabel;

        if (allValid) {
            inputs.forEach(el => {
                houseData[el.id] = el.value;
            });

            if (currentBtn === n1) {
                w1.style.display = 'none';
                w2.style.display = 'flex';
            } else if (currentBtn === n2) {
                w2.style.display = 'none';
                w3.style.display = 'flex';
            } else if (currentBtn === n3) {
                w3.style.display = 'none';
                w4.style.display = 'flex';
            }
        }
    } else if (currentBtn === n4) {
        const photoInput = document.getElementById('photos');
        const photoData = await getFiles(photoInput);
        const owner = localStorage.getItem('currentUser');
        
        await db.houses.add(Object.assign({}, houseData, {
            photos: photoData,
            owner: owner,
            sold: false,
            createdAt: new Date().toISOString()
        }));
        w4.style.display = 'none';
        houseData = {};
        document.querySelectorAll('input:not([type="file"]), textarea').forEach(el => el.value = '');
        document.getElementById('image-preview').innerHTML = '';
        refresh();
    }
}

async function refresh(filters = {}) {
    const container = document.querySelector('.houses');
    if (!container) return;
    container.innerHTML = '';
    const selectedCurrency = localStorage.getItem('valuta') || 'BYN';
    valuta.value = selectedCurrency;

    try {
        let data = await db.houses.toArray();
        data = data.filter(item => !item.sold || item.sold == 0);
        await isokprice();

        let rates = { "BYN": 1 };
        try {
            rates = await getRates();
        } catch (err) {}
        
        const rate = rates[selectedCurrency] || 1;

        if (filters.maxPrice) data = data.filter(item => (+item.price || 0) <= filters.maxPrice);
        if (filters.material) data = data.filter(item => item.m1 && item.m1.toLowerCase().includes(filters.material.toLowerCase()));
        if (filters.minYear) data = data.filter(item => parseInt(item.year) >= filters.minYear);
        if (filters.minPlot) data = data.filter(item => parseFloat(item.square1) >= filters.minPlot);
        if (filters.minHouse) data = data.filter(item => parseFloat(item.square2) >= filters.minHouse);
        if (filters.search) {
            data = data.filter(item => 
                (item.nameann && item.nameann.toLowerCase().includes(filters.search)) || 
                (item.last && item.last.toLowerCase().includes(filters.search))
            );
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'house-card';
            const convertedPrice = (parseFloat(item.price) * rate).toFixed(0);
            let imgHtml = item.photos && item.photos.length > 0 ? `<img src="${item.photos[0]}" alt="">` : '<div class="no-photo">Нет фото</div>';

            card.innerHTML = `
                ${imgHtml}
                <div class="house-info">
                    <h4>${item.nameann}</h4>
                    <p class="price">${convertedPrice} ${selectedCurrency}</p>
                    <p class="address">${item.address}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `house.html?id=${item.id}`;
            });
            container.appendChild(card);
        });
    } catch (e) {}
}

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.house-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const inside = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
        if (inside) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = (y - rect.height / 2) / 10;
            const ry = (rect.width / 2 - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
        } else {
            card.style.transform = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    await makeAdmin();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('relist') === 'true') {
        const rawData = localStorage.getItem('relist_temp');
        if (rawData) {
            const data = JSON.parse(rawData);
            w1.style.display = 'flex';
            ['nameann', 'address', 'price', 'last', 'square1', 'square2', 'year', 'm1', 'm2', 'name'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = data[id] || "";
            });
            localStorage.removeItem('relist_temp');
        }
    }
    update();
    refresh();
});

const helpBtn = document.getElementById('help-btn');
if (helpBtn) {
    helpBtn.addEventListener('click', () => {
        window.location.href = 'help.html';
    });
}
