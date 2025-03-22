const MODE_NOT_STARTED = "notstarted";
const MODE_STARTED = "started";

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

function start() {
	const timer = document.querySelector("#timer");
	const time = document.querySelector("#time");
	const start = document.querySelector("#start-btn");

	if (currentMode == MODE_NOT_STARTED) {

		currentMode = MODE_STARTED;
		start.innerHTML = "Pause"

		beep();
		if (currentTime == 0) {
			currentTime = Number(time.value) + 1;
			console.log("Timer started")
		} else console.log("Timer continued")
		interval = setInterval(function() {
			if (currentTime > 0) {
				currentTime -= 1;
				timer.innerHTML = formatTime(currentTime);
			} else {
				clearInterval(interval);
				currentMode = MODE_NOT_STARTED;
				start.innerHTML = "Start"
				console.log("Timer finished")
				beep();
			}
		}, 1000);
	} else {
		start.innerHTML = "Continue"
		console.log("Pause state")
		currentMode = MODE_NOT_STARTED
		clearInterval(interval);
	}
}