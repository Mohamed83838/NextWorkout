function start() {
	timer = document.querySelector("#timer")
	time = Number(document.querySelector("#time").value)
	x = time
	x = setInterval(function() {
		if (x > time):
			x -= 1
			timer.innerHTML = x
	}, 1000);
	
}
