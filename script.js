currentMode = "notstarted";

function start(x) {
	const timer = document.querySelector("#timer");
	const time = document.querySelector("#time");
	const start = document.querySelector("#start-btn");
	if (currentMode == "notstarted" || currentMode == "continued"){
		currentMode = "started";
		start.innerHTML = "Pause"

	beep();

	
	if (x){
		currentTime = x
	} else {
		currentTime = Number(time.value) + 1;
	}
	interval = setInterval(function(){
		if (currentTime > 0) {
			currentTime -= 1;
			timer.innerHTML = formatTime(currentTime);
		} else {
			clearInterval(interval);
			currentMode = "notstarted";
			start.innerHTML = "Start"
			beep();
		}
	}, 1000);
} else if (currentMode == "continue"){
	currentMode = "continued";
	start1(currentTime);
	
} else {

	start.innerHTML = "Continue"
	currentMode = "continue"
	clearInterval(interval);
}
	
}
function start1(currentTime) {
	// body...
	start(currentTime);
}
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