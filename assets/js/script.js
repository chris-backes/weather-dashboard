function getWeather(city) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=17669d7988f848c5dcc4c6b27521896b&units=imperial";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //styles most of the daily weather
          displayWeather(data, city);
          //initializes a second fetch using the longitude and latitude of the first response, is used fro the UV Index and Forecast
          getUviAndForecast(data.coord.lat, data.coord.lon);
          //stores the cities that hve been recently searched for
          localStoring(city);
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Weather Service");
    });
}

function getUviAndForecast(lat, lon) {
  let apiUrlTwo =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=17669d7988f848c5dcc4c6b27521896b&units=imperial";
  fetch(apiUrlTwo)
    .then(function (response) {
      if (response.ok) {
        //styles the background of the UV Index based on the severity
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
          styleForecast(data);
        });
      } else {
        console.log("This didn't work");
      }
    })

    .catch(function (error) {
      console.log("This didn't work");
    });
}

function displayWeather(data, citySearched) {
  $("#city-here").text(
    citySearched + " (" + new Date().toLocaleDateString() + ")"
  );
  $("#temp").text(data.main.temp);
  $("#wind").text(data.wind.speed);
  $("#humidity").text(data.main.humidity);
  $("#weather-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
  $("#weather-icon").attr(
    "alt",
    data.weather[0].main + ", " + data.weather[0].description
  );
}

function localStoring(city) {
  let previousSearch = JSON.parse(localStorage.getItem("search-history"));
  let searchHistory = [];
  //loads search history, if any
  if (previousSearch) {
    for (let i = 0; i < previousSearch.length; i++) {
      searchHistory.push(previousSearch[i]);
    }
  }
  //capitalizes each word in the search if they are not already
  let newTerm = city.trim();
  if (newTerm.includes(" ")) {
    let newTermArray = newTerm.split(" ");
    for (let i = 0; i < newTermArray.length; i++) {
      newTermArray[i] =
        newTermArray[i][0].toUpperCase() + newTermArray[i].substr(1);
    }
    newTerm = newTermArray.join(" ");
  }
  //checks to see if the search term is already in the array, then adds it to array if not in there
  if (!searchHistory.includes(newTerm)) {
    searchHistory.unshift(newTerm);
  }
  if (searchHistory.length > 8) {
    searchHistory.pop();
  }
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
}

function styleForecast(data) {
  for (let i = 1; i <= 5; i++) {
    let dateDT = data.daily[i].dt * 1000;
    $("#date-" + i).text(new Date(dateDT).toLocaleDateString());
    $("#weather-icon-" + i).attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png"
    );
    $("#weather-icon-" + i).attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png"
    );
    $("#weather-icon-" + i).attr(
      "alt",
      data.daily[i].weather[0].main +
        ", " +
        data.daily[i].weather[0].description
    );
    $("#temp-" + i).text(data.daily[i].temp.day);
    $("#wind-" + i).text(data.daily[i].wind_speed);
    $("#humidity-" + i).text(data.daily[i].humidity);
  }
}

function grabStorage() {
  let searchHistory = JSON.parse(localStorage.getItem("search-history"));
  if (searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
      $("#search-bar").append(
        "<button class='col-12 btn btn-secondary my-1'>" +
          searchHistory[i] +
          "</button>"
      );
    }
    $(".btn-secondary").on("click", function () {
      getWeather($(this).text());
    });
  }
}

function containerFunction() {
  let cityName = document.querySelector("#city-name").value.trim();
  getWeather(cityName);
}

$("#sub-btn").on("click", containerFunction);

$(document).ready(grabStorage);
