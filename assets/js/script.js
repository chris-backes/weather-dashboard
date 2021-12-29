let subButtonEl = document.querySelector("#sub-btn");
let weatherCityEl = document.querySelector("#city-here");
let presentTempEl = document.querySelector("#temp");
let presentWindEl = document.querySelector("#wind");
let presentHumidityEl = document.querySelector("#humidity");
let presentUviEl = $("#uvi");

function getWeather(city) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=17669d7988f848c5dcc4c6b27521896b&units=imperial";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
          $("#weather-icon").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png"
          );
          getUvi(data.coord.lat, data.coord.lon);
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Weather Service");
    });
  let apiUrlThree =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=17669d7988f848c5dcc4c6b27521896b";
  fetch(apiUrlThree)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("This works");
          // displayForecast();
        });
      } else {
        console.log("This didn't work");
      }
    })
    .catch(function (error) {
      console.log("This didn't work");
    });
}

function getUvi(lat, lon) {
  let apiUrlTwo =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=17669d7988f848c5dcc4c6b27521896b";
  console.log(apiUrlTwo);
  fetch(apiUrlTwo)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          $("#uvi").removeClass();
          $("#uvi").addClass("uvi");
          $("#uvi").text(data.current.uvi);
          if (data.current.uvi <= 2) {
            $("#uvi").addClass("green");
          } else if (data.current.uvi <= 5) {
            $("#uvi").addClass("yellow");
          } else if (data.current.uvi <= 7) {
            $("#uvi").addClass("orange");
          } else {
            $("#uvi").addClass("red");
          }
        });
      } else {
        console.log("This didn't work");
      }
    })

    .catch(function (error) {
      console.log("This didn't work");
    });
}

function displayWeather(weather, citySearched) {
  weatherCityEl.textContent =
    citySearched + " (" + new Date().toLocaleDateString() + ")";
  presentTempEl.textContent = weather.main.temp;
  presentWindEl.textContent = weather.wind.speed;
  presentHumidityEl.textContent = weather.main.humidity;
}

function containerFunction() {
  let cityName = document.querySelector("#city-name").value.trim();
  getWeather(cityName);
}

subButtonEl.addEventListener("click", containerFunction);

// $(document).ready(function () {
//   $("#austin").click(getWeather($(this).text()));
// });
