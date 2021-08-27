// Dates and times
function formatTime(timestamp) {
  let now = new Date(timestamp);

  let hour = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);

  return `Last updated: ${hour}:${minutes}`;
}

// Search functionality
function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round((response.data.wind.speed * (60 * 60)) / 1000);
  let weatherIcon = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureMin = response.data.main.temp_min;
  celsiusTemperatureMax = response.data.main.temp_max;

  let tempCurrent = document.querySelector("#temp-current");
  tempCurrent.innerHTML = `${temperature}`;
  let tempMin = document.querySelector("#temp-today-min");
  tempMin.innerHTML = `${temperatureMin}`;
  let tempMax = document.querySelector("#temp-today-max");
  tempMax.innerHTML = `${temperatureMax}`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = `${condition}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}`;
  let currentIcon = document.querySelector(".weather-today");
  currentIcon.innerHTML = `<img src="images/${weatherIcon}.jpg">`;

  let date = document.querySelector(".last-updated");
  date.innerHTML = formatTime(response.data.dt * 1000);
}

function searchCity(userCity) {
  let apiKey = "2f386d782b5e244383fa40d4dada37d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();

  let userCity = document.querySelector("#search-input");
  userCity = userCity.value.trim();

  searchCity(userCity);
}

let userCity = document.querySelector("#search");
userCity.addEventListener("submit", handleSearch);

// Current location button
function showWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "2f386d782b5e244383fa40d4dada37d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showWeather);
}

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", getLocation);

// Convert temperature
function convertCelsius(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#temp-current");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let currentTempAddition = document.querySelector(".celsius");
  currentTempAddition.innerHTML = `C`;

  let currentTempMin = document.querySelector("#temp-today-min");
  currentTempMin.innerHTML = Math.round(celsiusTemperatureMin);

  let currentTempMax = document.querySelector("#temp-today-max");
  currentTempMax.innerHTML = Math.round(celsiusTemperatureMax);

  let tempConverter = document.querySelector(".fahrenheit");
  tempConverter.innerHTML = ``;
}

function convertTemp(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#temp-current");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  currentTemp.innerHTML = Math.round(fahrenheitTemperature);

  let currentTempAddition = document.querySelector(".celsius");
  currentTempAddition.innerHTML = `F`;

  let currentTempMin = document.querySelector("#temp-today-min");
  let fahrenheitTempMin = (celsiusTemperatureMin * 9) / 5 + 32;

  currentTempMin.innerHTML = Math.round(fahrenheitTempMin);

  let currentTempMax = document.querySelector("#temp-today-max");
  let fahrenheitTempMax = (celsiusTemperatureMax * 9) / 5 + 32;

  currentTempMax.innerHTML = Math.round(fahrenheitTempMax);

  let fahrenheitToCelsius = document.querySelector(".fahrenheit");
  fahrenheitToCelsius.innerHTML = `Show in Celsius`;
  fahrenheitToCelsius.addEventListener("click", convertCelsius);
}

let tempConverter = document.querySelector(".fahrenheit");
tempConverter.addEventListener("click", convertTemp);

let celsiusTemperature = null;
let celsiusTemperatureMin = null;
let celsiusTemperatureMax = null;

// Default city
searchCity("Amsterdam");
