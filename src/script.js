// Dates and times
function formatTime(timestamp) {
  let now = new Date(timestamp);

  let hour = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);

  return `Last updated: ${hour}:${minutes}`;
}

// Forecast
function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastSection = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `          <div class="col">
            <div class="weather-cat">
              <h3>${formatForecast(forecastDay.dt)}</h3>
            </div>
            <div class="forecast-block-day">
              <div class="img-section">
                <img src="images/${forecastDay.weather[0].icon}.jpg" />
              </div>
              <div class="forecast-temp">
                <p>
                  ${Math.round(
                    forecastDay.temp.min
                  )}°/<span id="forecast-max">${Math.round(
          forecastDay.temp.max
        )}</span>°
                </p>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastSection.innerHTML = forecastHTML;
}

function getForecastCoords(coordinates) {
  let apiKey = "2f386d782b5e244383fa40d4dada37d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
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

  getForecastCoords(response.data.coord);
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

// Global function calls
searchCity("Amsterdam");
