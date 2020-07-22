const teller = document.getElementById("teller");
const averagePerMin = document.getElementById("average");
const averagePerHour = document.getElementById("average-hour");
const time = document.getElementById("time");
const exit = document.getElementById("exit");
let number = 0;
let clockIsStarted = false;
let start;

let timerInterval;


function handleKeyPress(event) {
    startClockKeyPress();
    if (clockIsStarted) {
        if (event.keyCode === 32 || event.keyCode === 107 || event.keyCode === 38 || event.keyCode === 39){
            number ++;
            showNumber();
            localStorage.setItem('number', number);
        } 

        if (event.keyCode === 40 || event.keyCode === 109 || event.keyCode === 189 || event.keyCode === 8 || event.keyCode === 37){
            number --;
            showNumber();
            localStorage.setItem('number', number);
        } 
    }
}


function showNumber() {
    const numStr = number.toString().padStart(3, "0");
    teller.innerHTML = numStr;
}

function startClockKeyPress() {
    if (event.keyCode === 13 && !clockIsStarted) {
        start = Math.floor(Date.now() / 1000);
        startClock(start); 
        localStorage.setItem('startTime', start);
    }
}

function startClock(startTime) {
    timerInterval = setInterval(timeLapse, 50);
    clockIsStarted = true; 
    start = startTime; 
}

function timeLapse() { 
    const secondsPassed = Math.floor(Date.now() / 1000) - start;
    const average = Math.round(number / secondsPassed * 60) || 0;
    const minutes = Math.floor(secondsPassed / 60);
    const averageHour = Math.floor(number / secondsPassed * 3600) || 0;
    const timeSeconds = secondsPassed % 60;

    averagePerMin.innerHTML = average;
    averagePerHour.innerHTML = averageHour;
    time.innerHTML = `${minutes.toString().padStart(2, "0")}:${timeSeconds.toString().padStart(2, "0")}`;
    
    if(secondsPassed === 60 * 60){
        clearInterval(timerInterval);
    }

}

function initialize() {
    let startTime;
    if(startTime = localStorage.getItem('startTime')){
        startClock(startTime);
        number = localStorage.getItem('number');
        showNumber();
    }
}


function reNew() {
    localStorage.removeItem("startTime");
    localStorage.removeItem("number");

    window.location.reload();    
}


window.addEventListener("keyup", handleKeyPress);
exit.addEventListener("click", reNew);
initialize();
