let day = "";
let hours = "";
let minutes = "";
let seconds = "";
let month = "";
let year = "";
let date = "";

setInterval(function(){
  // Managing the Day of the week section. Capture the value using getDay() method and assign to day variable. As In DOM all the day is display as Sun to Sat then, one need to highlight the current day. what is way to loop through each element where innerHTML are all week days then go and based on the current day style the the day.
  let d = new Date();
  day = d.getDay();
  switch(day){
    case 0:
      day = "Sunday";
      break;
    case 1: 
      day = "Monday";
      break;
    case 2: 
      day = "Tuesday";
      break;
    case 3: 
      day = "Wednesday";
      break;
    case 4: 
      day = "Thursday";
      break;
    case 5: 
      day = "Friday";
      break;
    case 6: 
      day = "Saturday";
      break;
    default:
      console.log("something went wrong");
  }
  day = day.toLowerCase();
  let targetDay = document.querySelectorAll(".day-of-week");
  targetDay.forEach((singleDay) => {
    if((singleDay.id) === day){
      document.querySelector(`#${singleDay.id}`).style.color = "#EEEEEE";
    } else{
      document.querySelector(`#${singleDay.id}`).style.color = "#757e8e";
    }
  })

  //Managing Hours, Minutes, Seconds. If its in single digit attaching extra 0 as prefixed. And access the the DOM element to represent this hours, min and sec in their respective DOM element.
  
  hours = d.getHours();
  minutes = d.getMinutes();
  seconds = d.getSeconds();

  hours = hours.toString();
  minutes = minutes.toString();
  seconds = seconds.toString();
  if(hours.length !== 2){
    hours = `0${hours}`;
  }
  if(minutes.length !== 2){
    minutes = `0${minutes}`;
  }
  if(seconds.length !== 2){
    seconds = `0${seconds}`;
  }
  document.querySelector(".time-in-hours").innerHTML= hours;
  document.querySelector(".time-in-minutes").innerHTML = minutes;
  document.querySelector(".time-in-seconds").innerHTML = seconds;

  //Managing date, month and year.
  let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = d.getDate();
  month = monthArray[d.getMonth()];
  year = d.getFullYear();

  document.querySelector(".date").innerHTML = date;
  document.querySelector(".month").innerHTML = month;
  document.querySelector(".year").innerHTML = year;
  document
}, 1000)