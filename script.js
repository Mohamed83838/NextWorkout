function start() {
	console.log("start")
	timer = document.querySelector("#timer")
	time = Number(document.querySelector("#time").value)
	x = time
	x = setInterval(function() {
		if (x > 0){
			x -= 1
			timer.innerHTML = x
		}
	}, 1000);
	
}
