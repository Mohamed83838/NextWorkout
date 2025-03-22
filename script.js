function start() {
	const timer = document.querySelector("#timer");
	const time = document.querySelector("#time");

	beep();

	currentTime = Number(time.value) + 1;
	interval = setInterval(function(){
		if (currentTime > 0) {
			currentTime -= 1;
			timer.innerHTML = formatTime(currentTime);
		} else {
			clearInterval(interval);
			beep();
		}
	}, 1000);
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