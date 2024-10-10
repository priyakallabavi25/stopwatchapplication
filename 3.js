let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    timerInterval,
    isRunning = false;

const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("lapsList");

function updateDisplay() {
    hoursElement.textContent = hours < 10 ? "0" + hours : hours;
    minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;
    millisecondsElement.textContent = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 10);
        startPauseButton.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = "Start";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    isRunning = false;
    updateDisplay();
    startPauseButton.textContent = "Start";
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = 
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds) + ":" +
            (milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds);
        
        const lapElement = document.createElement("li");
        lapElement.textContent = lapTime;
        document.getElementById("lapsList").appendChild(lapElement);
    }
}


startPauseButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);