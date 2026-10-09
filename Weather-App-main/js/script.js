const apikey = "dfaeb3167eb62e574b888bebb7c934e6";
// let city = "ahmedabad";

const fetchWeatherData = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
    const finalres = await res.json();
    console.log(finalres);
    console.log(finalres.name);
    console.log(finalres.main.temp);
    console.log(finalres.wind.speed);
    console.log(finalres.main.humidity);
    console.log(finalres.visibility);
    updateWeatherUI(finalres)
}
// fetchWeatherData()

let cityelem = document.querySelector('.city');
let temp = document.querySelector('.temp');
let windSpeed = document.querySelector('.wind-speed');
let humidity = document.querySelector('.humidity');
let visibilityDistance = document.querySelector('.visibility-distance');
let descriptionText = document.querySelector('.description-text');
let date = document.querySelector('.date');
const iconElem = document.getElementById('weather-icon');
// console.log(cityelem)

const updateWeatherUI = (data) => {
    console.log(data);
    cityelem.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = data.wind.speed + " KM/H";
    humidity.textContent = data.main.humidity + " %";
    visibilityDistance.textContent = `${data.visibility / 1000} KM`;
    descriptionText.textContent = data.weather[0].description;

    const curruntDate = new Date();
    date.textContent = curruntDate.toDateString();
    
    const iconCode = data.weather[0].icon;
    iconElem.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    // iconElem.alt = data.weather[0].description;
}

const searchForm = document.querySelector('.search-form');
const cityInput = document.querySelector('.city-input');

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let city = cityInput.value;
    if (city !== "") {
        fetchWeatherData(city);
        cityInput.value = "";
    }
})