let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let time = document.querySelector("#time");
time.innerHTML = `Local time is ${day} ${hours}:${minutes}`;

//week5 homework

let apiKey = "63214c4281922e3bb72fdf12dada7734";
let units = "imperial";

function findYourCity(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  let city = document.querySelector("#city-search");
  h2.innerHTML = city.value;
  let searchCity = city.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  function showTemp(response) {
    let h4 = document.querySelector("h4");
    let temp = Math.round(response.data.main.temp);
    h4.innerHTML = `${temp}℉`;
    console.log(response);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
    let humid = document.querySelector("#humidity");
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  }
}
navigator.geolocation.getCurrentPosition(getCurrentLocation);
function getCurrentLocal(event) {
  event.preventDefault();
  getCurrentLocation();
}

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(geoApi).then(latLongLocation);
}
function latLongLocation(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${Math.round(response.data.main.temp)}℉`;
  console.log(response);
}

let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", findYourCity);
let currentBtn = document.querySelector("#current-location");
currentBtn.addEventListener("click", getCurrentLocal);
