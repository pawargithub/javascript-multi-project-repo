// variable which will display in display area which will change during countdown.
let minutes = "25";
let sec ="00";

// when the restart button is clicked this variable already hold the previously set most recent values.
let tempValuesMinutes = minutes;
let tempValuesSec = sec;
document.querySelector(".display-time-changer > span").innerHTML = `${minutes} : ${sec}`;

let menuBtn = document.querySelectorAll(".pomodoro-options a");
menuBtn = Array.from(menuBtn);
menuBtn[0].classList.add("background-menu-btn");

menuBtn.forEach((singleBtn) => {
    singleBtn.addEventListener("click", function(e) {
        let selected = e.target.getAttribute('data-value');
        if (selected === "focus"){
            minutes = "25";
            sec = "00";
            menuBtn.forEach((item) => {
                // console.log(item);
                if(item.getAttribute('data-value') !== "focus"){
                    item.classList.remove("background-menu-btn");
                } else {
                    item.classList.add("background-menu-btn")
                }
            })
        } else if (selected === "short-break"){
            minutes = "05";
            sec = "00";
            menuBtn.forEach((item) => {
                // console.log(item);
                if(item.getAttribute('data-value') !== "short-break"){
                    item.classList.remove("background-menu-btn");
                } else {
                    item.classList.add("background-menu-btn")
                }
            })
        } else if (selected === "long-break"){
            minutes = "15";
            sec = "00";
            menuBtn.forEach((item) => {
                // console.log(item);
                if(item.getAttribute('data-value') !== "long-break"){
                    item.classList.remove("background-menu-btn");
                } else {
                    item.classList.add("background-menu-btn")
                }
            })
        }
        tempValuesMinutes = minutes;
        tempValuesSec = sec;
        document.querySelector(".display-time-changer > span").innerHTML = `${minutes} : ${sec}`;
    });
});
//Basically the value of above are set as per the use choice eg. when use click on focus the value will set of min and sec as 25 and 00 sec.


//Access the start button through which a click event listener is attached to the button when clicked it going to set a new button reside it as restart and call the main logic function which is countdown.
let startTask = document.querySelector(".start-button > button");

startTask.addEventListener("click", () => {
    document.querySelector(".restart-btn").style.display = "inline";
    document.querySelector(".start-btn").style.display = "none";
    handleCountDown();
})

//This  is the main logical function where our countdown is handled.
function handleCountDown(){
minutes = Number(minutes);
sec = Number(sec);

//Every each second the function is called such that either the sec should be greater than 0 and minute should not be less than 0. If its then it going to stop the setInterval function and call stopTimer. 
const myTaskTimer = setInterval( ()=> {
    if(sec > 0 && minutes >= 0){
        sec = --sec;
        if(!(sec >= 10)){
            sec = sec.toString();
            sec = "0" + sec;
            // sec = Number(sec);
        } 
        if(!(minutes >= 10)){
            minutes = minutes.toString();
            minutes = "0" + minutes;
            // minutes = Number(minutes);
        }
        document.querySelector(".display-time-changer > span").innerHTML = `${minutes} : ${sec}`;
        sec = Number(sec);
        minutes = Number(minutes);
    }
    else{
       if(minutes >= 0){
            minutes -= 1;
            sec = 60
       } else {
            stoptimer(null);
       }
    }
}, 1000);

// This is stop timer function where it will get called when min and sec is equal to 00:00;
function stoptimer(value){
    clearInterval(myTaskTimer);
    if (value === null){
        playSound();
        
        document.querySelector(".display-time-changer > span").innerHTML = `Timer over`;
    }
}

function playSound() {
    var audio = new Audio("./sound_effects/bell-sound.mp3");
    audio.play();
}

// function related to restart the countdown again.
let restartbtnClicked = document.querySelector(".restart-btn");
restartbtnClicked.addEventListener("click", (e) =>  {
   stoptimer(!null);
   minutes = tempValuesMinutes;
   sec = tempValuesSec;
   document.querySelector(".display-time-changer > span").innerHTML = `${minutes} : ${sec}`;
   document.querySelector(".start-btn").style.display = "inline";
   document.querySelector(".restart-btn").style.display = "none";
})
}