
    
var map = L.map('map').setView([0,0], 1);
var marker = L.marker([0, 0]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const search = document.getElementById('search');
const input = document.getElementById('city');
const weatherd = document.getElementById('weatherdata')

search.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=4c722ffdef0ddf125309ee67ff0334a5&lang=ru&units=metric`)
    .then(r => {
        if (!r.ok) throw new Error('City not found');
        return r.json();
    })
    .then(data => {
        console.log(data);
        weatherd.innerHTML = 
        `<div>
            <h1>${data.name},${data.sys.country}</h1>
            <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
            <p>${data.main.temp}°C</p>
            <p>Погода: ${data.weather[0].description}</p>
            <p>Влажность: ${data.main.humidity}%</p>
            <p>Давление: ${data.main.pressure}гПа</p>
            <p>Ветер: ${data.wind.speed}м/c</p>
            <p>Видимость: ${data.visibility}м</p>
        </div>`
        map.setView([data.coord.lat, data.coord.lon], 13);
        marker.setLatLng([data.coord.lat, data.coord.lon]);
        marker.bindPopup(data.name).openPopup();
    })
    .catch(err => console.error(err.message));

});
