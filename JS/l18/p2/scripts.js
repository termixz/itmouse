fetch(`https://api.openweathermap.org/data/2.5/weather?q=Grodno&appid=4c722ffdef0ddf125309ee67ff0334a5&lang=ru&units=metric`)
    .then(r => {
        if (!r.ok) throw new Error('City not found');
        return r.json();
    })
    .then(data => {
        console.log(`Погода в Гродно:\nТемпература: ${data.main.temp}°C\nОщущается как: ${data.main.feels_like}°C\nНа небе: ${data.weather[0].description}\nВетер: ${data.wind.speed}м/c\nВлажность: ${data.main.humidity}%`);
    })
    .catch(err => console.error(err.message));

var map = L.map('map').setView([0,0], 1);
var marker = L.marker([0, 0]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const showbtn = document.getElementById('show');
const latitudeinput = document.getElementById('latitude');
const longitudeinput = document.getElementById('longitude');
const cla = document.getElementById('clatitude');
const clo = document.getElementById('clongitude');

showbtn.addEventListener('click', () => {
    let lat = Number(latitudeinput.value);
    let lng = Number(longitudeinput.value);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Введите корректные числа");
        return;
    }

    cla.innerText = `Latitude: ${lat}`;
    clo.innerText = `Longitude: ${lng}`;

    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
    marker.bindPopup(`Координаты: ${lat}, ${lng}`).openPopup();
});
