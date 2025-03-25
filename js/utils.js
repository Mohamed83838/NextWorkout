// format time from seconds to numerique clock style (e.g. 00:00)
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

// BEEEEEEEEP
function beep() {
    const audio = new Audio('assets/audio/beep.mp3');
    audio.play();
}
