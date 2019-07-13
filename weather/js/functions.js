/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My javascript is being read.');

//this function will calculate a windchill temperature.

//these are variables for function use.
// let temp = 31;
// let speed = 5;
// let condition ="snow";
// buildWC(speed, temp);

// let direction = "sW";
// windDial(direction);

function buildWC(speed, temp) {
 let feelTemp = document.getElementById('feelTemp');

 // Compute the windchill
 let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
 console.log(wc);

 // Round the answer down to integer
 wc = Math.floor(wc);

 // If chill is greater than temp, return the temp
 wc = (wc > temp)?temp:wc;

 // Display the windchill
 console.log(wc);
 // wc = 'Feels like '+wc+'°F';
 feelTemp.innerHTML = wc;
 }


// Wind Dial Function
function windDial(direction){
    // Get the container
    let dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction.toUpperCase()){
     case "North":
     case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
      dial.setAttribute("class", "w");
      break;
    }
   }
   
   function getCondition(condition)  {
      console.log(condition)
      if(condition.includes("Thunderstorms")) {
          return "rain";
      }

      if(condition.includes("clear")){
        return "clear";
      }
      if(condition.includes("snow")){
        return "snow";}

      if(condition.includes("fog")){
          return "fog";
        }
        if(condition.includes("clouds")){
          return "clouds";
        }
      
      

   }

  // let newcondition = getCondition(condition);
  // console.log(newcondition);
  // ChangeSummaryImage(newcondition);

  function ChangeSummaryImage(newcondition){
    let image = document.getElementById("bg-image");

    switch (newcondition) {
  case "rain":
    image.setAttribute("class", "rain");
    break;
  case "snow":
    image.setAttribute("class", "snow");
    break;
  case "clear":
    image.setAttribute("class", "clear");
    break;
  case "fog":
    image.setAttribute("class", "fog");
      break;
  case "clouds":
    image.setAttribute("class", "clouds");
      break;
  
       
     
}
//  var elevation = document.getElementById("elevation");
 
//  console.log(elevation);
 

  function convertMetersToFeet(meter){
   let feet = meter*3.281;
   feet= Math.round(feet);
   console.log(feet)
   return feet;
   

  }

  elevation.innerHTML = convertMetersToFeet(elevation.innerHTML);

}




// Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;

//this function will convert and format hours to a 12 hour format.
// Convert, Format time to 12 hour format
function format_time(hour) {
  if(hour > 23){ 
   hour -= 24; 
  } 
  let amPM = (hour > 11) ? "pm" : "am"; 
  if(hour > 12) { 
   hour -= 12; 
  } 
  if(hour == 0) { 
   hour = "12"; 
  } 
  return hour + amPM;
 }



 // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
  let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
   // Build the remaining list items using a for loop
   for (let i = 1, x = hourlyTemps.length; i < x; i++) {
    hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
  }
  console.log('HourlyList is: ' +hourlyListItems);
  return hourlyListItems;
 }



 //these functions will work together to get weather informaton 
//for the current location and populate a web page with the data.
'use strict';

// Set global variable for custom header required by NWS API
var storage = window.localStorage
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - abh17001@byui.edu"
    }
  };


// Call the function to get our geolocation
// getGeoLocation();

//the function will get the current location by longitude and latitude

function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);

         // Call getLocation function, send locale
   getLocation(locale);
      
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
      } //end getGeoLocation

      

      // Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function




   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("stationTemperature", data.properties.temperature.value); 
      storage.setItem("stationwindDirection", data.properties.windDirection.value); 
      storage.setItem("stationwindSpeed", data.properties.windSpeed.value); 
      storage.setItem("stationtextDescription", data.properties.textDescription); 

      getHourly();
       
   
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

// getHourly();
// Gets current weather information for a specific weather station from the NWS API
function getHourly() { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/gridpoints/PIH/125,87/forecast/hourly';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Get Hourly:'); 
      console.log(data);
    
      // Store weather information to localStorage 
     storage.setItem("stationtextForecast", data.properties.periods[0].shortForecast); 

      let hourlyData = [];

      for (let i = 0; i < 13; i++) {
        hourlyData[i] = data.properties.periods[i].temperature;
      }

    storage.setItem("hourlyData", hourlyData)
   
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

   