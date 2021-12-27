let subButtonEl = document.querySelector("#sub-btn");

function getWeather(city) {
  let apiUrl =
    "api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=17669d7988f848c5dcc4c6b27521896b";
  fetch(apiUrl)
    .then(console.log("fetch worked"))
    .then(function (res) {
      console.log(res.json());
    });
}

function getForecast(lat, lon) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=17669d7988f848c5dcc4c6b27521896b";
}

function containerFunction() {
  let cityName = document.querySelector("#city-name").value.trim();
  getWeather(cityName);
  getForecast();
}

subButtonEl.addEventListener("click", containerFunction);
