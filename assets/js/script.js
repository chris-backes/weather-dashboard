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
  //capitalizes the search term
  let searchTerm = citySearched.trim();
  if (searchTerm.includes(" ")) {
    let searchTermArray = searchTerm.split(" ");
    for (let i = 0; i < searchTermArray.length; i++) {
      searchTermArray[i] =
        searchTermArray[i][0].toUpperCase() + searchTermArray[i].substr(1);
    }
    searchTerm = searchTermArray.join(" ");
  } else {
    searchTerm = searchTerm[0].toUpperCase() + searchTerm.substr(1);
  }
  $("#city-here").text(
    searchTerm + " (" + new Date().toLocaleDateString() + ")"
  );
  $("#temp").text(data.main.temp);
  $("#wind").text(data.wind.speed);
  $("#humidity").text(data.main.humidity);
  //grabs the icon hosted on the webpage
  $("#weather-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
  //alt attribute for the image
  $("#weather-icon").attr(
    "alt",
    data.weather[0].main + ", " + data.weather[0].description
  );
  //title text appears when hovered over
  $("#weather-icon").attr(
    "title",
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
  } else {
    newTerm = newTerm[0].toUpperCase() + newTerm.substr(1);
  }
  //checks to see if the search term is already in the array, then adds it to array if not in there
  if (!searchHistory.includes(newTerm)) {
    searchHistory.unshift(newTerm);
  }
  //search history maxes out at 8 terms
  if (searchHistory.length > 8) {
    searchHistory.pop();
  }
  //stores search history
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
}

function styleForecast(data) {
  //loops through daily info from api, starting at second item (first item is for current day)
  for (let i = 1; i <= 5; i++) {
    //converting the dt from api to milliseconds
    let dateConversion = data.daily[i].dt * 1000;
    //uses the dt to display the date of the inforation, everything below is similar to the displayWeather function
    $("#date-" + i).text(new Date(dateConversion).toLocaleDateString());
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
    $("#weather-icon-" + i).attr(
      "title",
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
  //pulls info from lcoal storage. that info is then displayed below the search bar
  let searchHistory = JSON.parse(localStorage.getItem("search-history"));
  if (searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
      $("#search-bar").append(
        "<button class='col-12 btn btn-secondary my-1'>" +
          searchHistory[i] +
          "</button>"
      );
    }
    //even listerner is added to each button that initiates get weather
    $(".btn-secondary").on("click", function () {
      getWeather($(this).text());
    });
  }
}
//search button initiates this function rather than getWeather so that the input box can be passed in when running a search, and the text of the other buttons are passed when clicking them
function containerFunction() {
  let cityName = document.querySelector("#city-name").value.trim();
  getWeather(cityName);
}
//event listener for search button
$("#sub-btn").on("click", containerFunction);
//adds the buttons
$(document).ready(grabStorage);
