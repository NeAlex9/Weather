let temperature = document.querySelector(".weather-block__temperature");
/*const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.weather-description');*/

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&lang=ru&appid=914239bbaad94facc853ddcafa644c7d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    /*weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);*/
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    /*weatherDescription.textContent = data.weather[0].description;*/
}


document.addEventListener('DOMContentLoaded', getWeather);