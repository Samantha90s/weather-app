// Dates and times
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Thursday",
  "Friday",
];

let tomorrow = days[now.getDay() + 1].slice(0, 3);
let dayThree = days[now.getDay() + 2].slice(0, 3);
let dayFour = days[now.getDay() + 3].slice(0, 3);
let dayFive = days[now.getDay() + 4].slice(0, 3);
let daySix = days[now.getDay() + 5].slice(0, 3);

let dateTwo = document.querySelector("#day-two");
dateTwo.innerHTML = `${tomorrow}`;

let dateThree = document.querySelector("#day-three");
dateThree.innerHTML = `${dayThree}`;

let dateFour = document.querySelector("#day-four");
dateFour.innerHTML = `${dayFour}`;

let dateFive = document.querySelector("#day-five");
dateFive.innerHTML = `${dayFive}`;

let dateSix = document.querySelector("#day-six");
dateSix.innerHTML = `${daySix}`;

// Local time
function formatTime(timestamp) {
  let now = new Date(timestamp);

  let hour = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);

  return `${hour}:${minutes}, local time`;
}

// Search functionality
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  let humidity = response.data.main.humidity;
  let wind = Math.round((response.data.wind.speed * (60 * 60)) / 1000);
  let weatherIcon = response.data.weather[0].icon;

  let tempCurrent = document.querySelector("#temp-current");
  tempCurrent.innerHTML = `${temperature}`;
  let tempMin = document.querySelector("#temp-today-min");
  tempMin.innerHTML = `${temperatureMin}`;
  let tempMax = document.querySelector("#temp-today-max");
  tempMax.innerHTML = `${temperatureMax}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}`;
  let currentIcon = document.querySelector(".weather-today");
  currentIcon.innerHTML = `<img src="images/${weatherIcon}.jpg">`;

  let date = document.querySelector(".last-updated");
  date.innerHTML =
    "Last updated: " +
    formatTime(response.data.dt + response.data.timezone * 1000);
}

function searchCity(event) {
  event.preventDefault();

  let userCity = document.querySelector("#search-input");
  userCity = userCity.value.trim();

  let city = document.querySelector("#city");
  city.innerHTML = `${userCity}`;

  let apiKey = "2f386d782b5e244383fa40d4dada37d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let userCity = document.querySelector("#search");
userCity.addEventListener("submit", searchCity);

// Default city
let apiKey = "2f386d782b5e244383fa40d4dada37d4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);

// Current location button
function showCity(response) {
  let userCity = response.data.name;

  let city = document.querySelector("#city");
  city.innerHTML = `${userCity}`;

  showTemperature(response);
}

function showWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "2f386d782b5e244383fa40d4dada37d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCity);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showWeather);
}

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", getLocation);

// Convert temperature
function convertTemp() {
  let currentTemp = document.querySelector("#temp-current");
  let celsius = currentTemp.innerHTML;

  currentTemp.innerHTML = Math.round((celsius * 9) / 5 + 32);

  let currentTempAddition = document.querySelector(".celsius");
  currentTempAddition.innerHTML = `F`;

  let currentTempMin = document.querySelector("#temp-today-min");
  let celsiusTempMin = currentTempMin.innerHTML;

  currentTempMin.innerHTML = Math.round((celsiusTempMin * 9) / 5 + 32);

  let currentTempMax = document.querySelector("#temp-today-max");
  let celsiusTempMax = currentTempMax.innerHTML;

  currentTempMax.innerHTML = Math.round((celsiusTempMax * 9) / 5 + 32);

  let dayTwoTempMin = document.querySelector("#day-two-min");
  let celsiusTwoTempMin = dayTwoTempMin.innerHTML;

  dayTwoTempMin.innerHTML = Math.round((celsiusTwoTempMin * 9) / 5 + 32);

  let dayTwoTempMax = document.querySelector("#day-two-max");
  let celsiusTwoTempMax = dayTwoTempMax.innerHTML;

  dayTwoTempMax.innerHTML = Math.round((celsiusTwoTempMax * 9) / 5 + 32);

  let dayThreeTempMin = document.querySelector("#day-three-min");
  let celsiusThreeTempMin = dayThreeTempMin.innerHTML;

  dayThreeTempMin.innerHTML = Math.round((celsiusThreeTempMin * 9) / 5 + 32);

  let dayThreeTempMax = document.querySelector("#day-three-max");
  let celsiusThreeTempMax = dayThreeTempMax.innerHTML;

  dayThreeTempMax.innerHTML = Math.round((celsiusThreeTempMax * 9) / 5 + 32);

  let dayFourTempMin = document.querySelector("#day-four-min");
  let celsiusFourTempMin = dayFourTempMin.innerHTML;

  dayFourTempMin.innerHTML = Math.round((celsiusFourTempMin * 9) / 5 + 32);

  let dayFourTempMax = document.querySelector("#day-four-max");
  let celsiusFourTempMax = dayFourTempMax.innerHTML;

  dayFourTempMax.innerHTML = Math.round((celsiusFourTempMax * 9) / 5 + 32);

  let dayFiveTempMin = document.querySelector("#day-five-min");
  let celsiusFiveTempMin = dayFiveTempMin.innerHTML;

  dayFiveTempMin.innerHTML = Math.round((celsiusFiveTempMin * 9) / 5 + 32);

  let dayFiveTempMax = document.querySelector("#day-five-max");
  let celsiusFiveTempMax = dayFiveTempMax.innerHTML;

  dayFiveTempMax.innerHTML = Math.round((celsiusFiveTempMax * 9) / 5 + 32);

  let daySixTempMin = document.querySelector("#day-six-min");
  let celsiusSixTempMin = daySixTempMin.innerHTML;

  daySixTempMin.innerHTML = Math.round((celsiusSixTempMin * 9) / 5 + 32);

  let daySixTempMax = document.querySelector("#day-six-max");
  let celsiusSixTempMax = daySixTempMax.innerHTML;

  daySixTempMax.innerHTML = Math.round((celsiusSixTempMax * 9) / 5 + 32);

  let fahrenheitToCelsius = document.querySelector(".fahrenheit");
  fahrenheitToCelsius.innerHTML = ``;
}

let tempConverter = document.querySelector(".fahrenheit");
tempConverter.addEventListener("click", convertTemp);
