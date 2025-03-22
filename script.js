function start() {
	const timer = document.querySelector("#timer");
	const time = document.querySelector("#time");

	currentTime = Number(time.value);
	interval = setInterval(function(){
		if (currentTime > 0) {
			currentTime -= 1;
			timer.innerHTML = currentTime;
		} else {
			clearInterval(interval);
		}
	}, 1000);
}