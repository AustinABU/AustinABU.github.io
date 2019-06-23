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

