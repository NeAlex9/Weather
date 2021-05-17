const city = document.querySelector(".city");
const country = document.querySelector(".country");
const currentTemperature = document.querySelector(".weather-block__temperature");
const wind = document.querySelector(".weather-block__wind");
const humidity = document.querySelector(".weather-block__humidity");
const feelsLike = document.querySelector(".weather-block__feels-like");
const description = document.querySelector(".weather-block__description");
const weatherIcon = document.querySelector(".weather-block__icon");
const language = document.querySelector(".language");
const celsius = document.querySelector(".degree__celsius");
const fahrenheit = document.querySelector(".degree__fahrenheit");

async function GetWeather(url) {
    const res = await fetch(url);
    return await res.json();
}

function SetCurrentWeather(data) {
    weatherIcon.classList.add(`owf`);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    let x;
    if (fahrenheit.className === "degree__fahrenheit") {
        x = "°C";
    } else {
        x = "°F";
    }
    currentTemperature.textContent = `${data.main.temp.toFixed(0)}${x}`;
    wind.textContent = `wind: ${data.wind.speed} m/s`;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
    feelsLike.textContent = `feels-like: ${data.main.feels_like.toFixed(0)}${x}`;
    description.textContent = data.weather[0].description;
}

function CreateWeatherForecast(data, forecast, dayOffset) {
    let lang;
    if (document.querySelector(".lang-text").textContent === "RU") {
        lang = "en";
    } else {
        lang = "ru";
    }

    let x;
    if (fahrenheit.className === "degree__fahrenheit") {
        x = "°C";
    } else {
        x = "°F";
    }

    lang = lang.toUpperCase();
    let today = new Date();
    let nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset);
    let temp = forecast.querySelector(".weather-forecast__temperature");
    temp.innerHTML = `${data.main.temp.toFixed(0)}${x}`;
    let dayWeek = forecast.querySelector(".weather-forecast__day-week");
    dayWeek.innerHTML = nextDay.toLocaleString(`${lang}-GB`, {weekday: 'long'});
    let forecastIcon = forecast.querySelector(".weather-forecast__icon");
    forecastIcon.classList.add(`owf`);
    forecastIcon.classList.add(`owf-${data.weather[0].id}`);

    return forecast;
}

function RenewFutureAndCurrentWeather(city) {
    let lang;
    if (document.querySelector(".lang-text").textContent === "RU") {
        lang = "en";
    } else {
        lang = "ru";
    }
    let unit;
    if (celsius.className === "degree__celsius") {
        unit = 'metric';
    } else {
        unit = 'imperial';
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=914239bbaad94facc853ddcafa644c7d&units=${unit}`;
    GetWeather(url).then(data => {
            SetCurrentWeather(data);
        }
    )

    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&appid=914239bbaad94facc853ddcafa644c7d&units=${unit}`;
    GetWeather(url).then(data => {
        let forecastWrapper = document.querySelector(".weather-forecast-wrapper");
        let pattern = document.querySelector(".weather-forecast");
        let elem = CreateWeatherForecast(data.list[0], pattern, 1);
        forecastWrapper.appendChild(elem);
        for (let i = 1; i < 3; i++) {
            pattern = document.querySelector(".weather-forecast");
            let elem = CreateWeatherForecast(data.list[i], pattern.cloneNode(true), i + 1);
            forecastWrapper.appendChild(elem);
        }
    })
}

function SetWeatherAndLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((() => {
            fetch("https://ipinfo.io/37.214.75.154?token=b5dc8df89c40cb").then(
                (response) => response.json()
            ).then(
                (jsonResponse) => {
                    let lang;
                    if (document.querySelector(".lang-text").textContent === "RU") {
                        lang = "en";
                    } else {
                        lang = "ru";
                    }

                    if (jsonResponse.city === "Minsk" && lang === 'ru') {
                        city.innerHTML = "Минск, ";
                    } else {
                        city.innerHTML = jsonResponse.city + ", ";
                    }

                    if (jsonResponse.country === "BY" && lang === 'ru') {
                        country.innerHTML = "Беларусь";
                    } else {
                        country.innerHTML = "belarus";
                    }

                    RenewFutureAndCurrentWeather(jsonResponse.city);
                }
            )
        }));
    }
}

language.addEventListener('click', () => {
    const languageText = document.querySelector(".lang-text");
    if (languageText.textContent === "RU") {
        languageText.textContent = "EN";
    } else {
        languageText.textContent = "RU";
    }
    const forecast = document.querySelectorAll(".weather-forecast");
    for (let i = 0; i < forecast.length - 1; i++) {
        forecast[i].remove();
    }

    SetWeatherAndLocation();
});

celsius.addEventListener('click', () => {
    celsius.className = 'degree__celsius';
    fahrenheit.className = 'degree__fahrenheit';
    const forecast = document.querySelectorAll(".weather-forecast");
    for (let i = 0; i < forecast.length - 1; i++) {
        forecast[i].remove();
    }
    SetWeatherAndLocation();
})

fahrenheit.addEventListener('click', () => {
    fahrenheit.className = 'degree__celsius';
    celsius.className = 'degree__fahrenheit';
    const forecast = document.querySelectorAll(".weather-forecast");
    for (let i = 0; i < forecast.length - 1; i++) {
        forecast[i].remove();
    }
    SetWeatherAndLocation();
})

SetWeatherAndLocation();