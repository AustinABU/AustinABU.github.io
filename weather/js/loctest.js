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

getGeoLocation();



//    // Gets weather station list and the nearest weather station ID from the NWS API
// function getStationId(stationsURL) { 
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(stationsURL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('From getStationId function:'); 
//       console.log(data);
    
//       // Store station ID and elevation (in meters - will need to be converted to feet) 
//       let stationId = data.features[0].properties.stationIdentifier; 
//       let stationElevation = data.features[0].properties.elevation.value; 
//       console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
//       // Store data to localstorage 
//       storage.setItem("stationId", stationId); 
//       storage.setItem("stationElevation", stationElevation); 
   
//       // Request the Current Weather for this station 
//       getWeather(stationId);
//      }) 
//     .catch(error => console.log('There was a getStationId error: ', error)) 
//    } // end getStationId function


