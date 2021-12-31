# Weather Dashboard

## Website

https://chris-backes.github.io/weather-dashboard/

## Screenshot

![Code Quiz Screenshot](./assets/images/screencapture.png)

## Gif

<p align="center">
<img alt="gif of webpage" src="./assets/images/weather-dashboard.gif" />
</p>

## User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Description

This web app responds to user requests for weather in specific locations by fetching data from a server side API and inputting that data into the HTML. The website utilizes HTML, CSS, and JavaScipt, along with BootStrap and JQuery. In addition, there are files for the images used, and a .gitignore.

Previous searches are stored in local storage, and upon the page load, those previous searches are pulled up and displayed below the search. The stored results are limited to eight most recent and unique searches, to prevent the list from running too long.

There are two fetch requests, becausue the second one requires data from the first.

### HTML

The HTML contians only those elements which are unchanging with each fetch request.

### CSS

The CSS used is a combination of bootstrap and local style sheet. The ilocal elements are for styling the UV index, the gradient background of the header, and the size of the weather icons.

### JS

In addition to JQuery, there are two local style sheets.

#### config.js

Stores the API key and is not tracks by git

#### script.js

There are three broad functions performed on this web app: accessing local storage, fetching API data, and displaing the API data on the application

##### Local Storage

Local Storage is accessed in two instances. In the first, the applicaiton grabs stored data to bedisplayed in the buttons below the search bar to pull up recent results.

In the second instance, any time a search is performed, the application accesses local storage and adds the item if the item is not already there. A maximum of 8 items is stored.

##### Fetch requests

Two API requests are made. In the first instance, we grab the current temp, wind, humidity, and longitude and latitude for the city, along with the data to reference for the image that gets display adjacnet to the header. The longitude and latitude are need to make the second request.

In the second instance, we grabs the UV Index, and the information for each of the five days of the forecast: temp, wind, humidity, in addition to the information for accessing the correct image or the weather.

#####  Display

There are two main compents of the display: one displaying the information from the API, and the other displaying the information from local storage.

Once the API information is accessed, the information within the API is accessed and displayed dynamically. Alt text and title text for each of the images are also added.

The information from local storage is displayed both at the beginning and whenever it gets updated.