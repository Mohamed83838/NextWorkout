<<<<<<< HEAD
const MODE_NOT_STARTED = "notstarted";
const MODE_STARTED = "started";
const MODE_CONTINUED = "continued";
const MODE_PAUSED = "paused";
const MODE_CONTINUE = "continue";

let currentMode = MODE_NOT_STARTED;
let currentTime = 0;
let interval;

function formatTime(time) {
	mins = Math.floor(time / 60);
	secs = time - (mins * 60);
	if (secs < 10) {
		secs = "0" + secs
	}
	if (mins < 10) {
		mins = "0" + mins
	}
	return mins + ":" + secs;
}

function beep() {
	const audio = new Audio('media/beep.mp3');
	audio.play();
}

function continueTimer() {
	start();
}

function start() {
	const timer = document.querySelector("#timer");
	const time = document.querySelector("#time");
	const start = document.querySelector("#start-btn");

	if (currentMode == MODE_NOT_STARTED || currentMode == MODE_CONTINUED) {

		currentMode = MODE_STARTED;
		start.innerHTML = "Pause"

		beep();
		if (currentTime == 0) {
			currentTime = Number(time.value) + 1;
			
		} else console.log("timer is continued!!")
		interval = setInterval(function() {
			if (currentTime > 0) {
				currentTime -= 1;
				timer.innerHTML = formatTime(currentTime);
			} else {
				clearInterval(interval);
				currentMode = MODE_NOT_STARTED;
				start.innerHTML = "Start"
				beep();
			}
		}, 1000);
	} else if (currentMode == MODE_CONTINUE) {
		currentMode = MODE_CONTINUED;
		console.log("Clicked continue, timer should be continued now!")
		continueTimer();
	} else {
		start.innerHTML = "Continue"
		console.log("Clicked Pause, now click continue")
		currentMode = MODE_CONTINUE
		clearInterval(interval);
	}
}