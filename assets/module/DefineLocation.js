const city = document.querySelector(".city");
const country = document.querySelector(".country");
const currentTemperature = document.querySelector(".weather-block__temperature");
const wind = document.querySelector(".weather-block__wind");
const humidity = document.querySelector(".weather-block__humidity");
const feelsLike = document.querySelector(".weather-block__feels-like");
const description = document.querySelector(".weather-block__description");
const weatherIcon = document.querySelector(".weather-block__icon")


let languageChangerContainer = {
    "ru": {
        "city": "",
        "country": "",
        "DayWeek": [],
        "month": "",
        "summary": "",
    },

    "en": {
        "city": "",
        "country": "",
        "DayWeek": [],
        "month": "",
        "summary": "",
    },
};

async function GetWeather(url) {
    const res = await fetch(url);
    return await res.json();
}

function SetCurrentWeather(data) {
    weatherIcon.classList.add(`owf`);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    currentTemperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent += `${data.wind.speed} m/s`;
    humidity.textContent += `${data.main.humidity}%`;
    feelsLike.textContent += `${data.main.feels_like.toFixed(0)}°C`;
    description.textContent = data.weather[0].description;
}

function CreateWeatherForecast(data, forecast, dayOffset) {
    let today = new Date();

    let nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset);
    let temp = forecast.querySelector(".weather-forecast__temperature");
    temp.innerHTML = `${data.main.temp.toFixed(0)}°C`;
    let dayWeek = forecast.querySelector(".weather-forecast__day-week");
    dayWeek.innerHTML = nextDay.toLocaleString('en-GB', {weekday: 'long'});
    languageChangerContainer['en'].DayWeek.push(nextDay.toLocaleString('en-GB', {weekday: 'long'}));
    languageChangerContainer['ru'].DayWeek.push(nextDay.toLocaleString('ru-GB', {weekday: 'long'}));
    let forecastIcon = forecast.querySelector(".weather-forecast__icon");
    forecastIcon.classList.add(`owf`);
    forecastIcon.classList.add(`owf-${data.weather[0].id}`);

    return forecast;
}

function RenewFutureAndCurrentWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=914239bbaad94facc853ddcafa644c7d&units=metric`;
    GetWeather(url).then(data => {
            SetCurrentWeather(data);
            languageChangerContainer['en']["summary"] = data.weather[0].description;
        }
    )

    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=914239bbaad94facc853ddcafa644c7d&units=metric`;
    GetWeather(url).then(data => {
            languageChangerContainer['ru']["summary"] = data.weather[0].description;
        }
    )

    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&appid=914239bbaad94facc853ddcafa644c7d&units=metric`;
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
                    city.innerHTML = jsonResponse.city + ", "
                    languageChangerContainer['en']['city'] = jsonResponse.city;
                    languageChangerContainer['ru']['city'] = (jsonResponse.city === 'Minsk') ? 'минск' : '';
                    if (jsonResponse.country === "BY") {
                        country.innerHTML = "belarus";
                        languageChangerContainer['en']['country'] = 'belarus';
                        languageChangerContainer['ru']['country'] = 'Беларусь';

                    }

                    RenewFutureAndCurrentWeather(jsonResponse.city);
                }
            )
        }));
    }
}

SetWeatherAndLocation();