let workoutPlan = [{
    exercise: "Jumping jacks",
    duration: 5,
    type: "timer"
}, {
    exercise: "Rest",
    duration: 5,
    type: "timer"
}, {
    exercise: "Push ups",
    duration: 0,
    type: "reps"
}, {
    exercise: "Rest",
    duration: 3,
    type: "timer"
}, {
    exercise: "Stretch",
    duration: 4,
    type: "timer"
}];

let workoutPlan1 = [{
    exercise: "High knees sprint",
    duration: 20,
    type: "timer"
}, {
    exercise: "Water break",
    duration: 10,
    type: "timer"
}, {
    exercise: "Pull ups",
    duration: 0,
    type: "reps"
}, {
    exercise: "Recover",
    duration: 15,
    type: "timer"
}, {
    exercise: "Cool down",
    duration: 30,
    type: "timer"
}];

workouts = [{
    name: "Morning routine",
    plan: workoutPlan
}, {
    name: "Night routine",
    plan: workoutPlan1
}]

const MODE_NOT_STARTED = "notstarted";
const MODE_STARTED = "started";

const ICON_PAUSE = "pause"
const ICON_START = "start"

let currentMode = MODE_NOT_STARTED;
let currentTime = 0;
let interval;


let currentWorkout = getCurrentWorkout();
let currentExercise = 0;
let startTime;

const timer = document.querySelector("#timer");
const time = document.querySelector("#time");
const start = document.querySelector("#start");
const done = document.querySelector("#done");

updateTimer()
setupSettingsDialog()

function setupSettingsDialog() {
    document.getElementById('settings').addEventListener('click', function() {
        document.getElementById('overlay').classList.add('show');
        document.getElementById('settingsDialogue').classList.add('show');
    });

    document.getElementById('closeSettings').addEventListener('click', function() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('settingsDialogue').classList.remove('show');
    });

    document.getElementById('saveSettings').addEventListener('click', function() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('settingsDialogue').classList.remove('show');
        updateTimer();
    });
}
function getCurrentWorkout() {
    return 0;
}
start.addEventListener('click', function() {
    updateExercise();
});

function updateExercise() {
    if (currentExercise >= workoutPlan.length) {
        updateTimer(0);
        console.log("Workout finished")
        return;
    }

    let exercise = workoutPlan[currentExercise];
    document.getElementById("current-timer-title").innerText = exercise.exercise;
    if (currentExercise + 1 != workoutPlan.length) {
        document.getElementById("next-timer-title").innerText = workoutPlan[currentExercise + 1].exercise;
    } else {
        document.getElementById("next-timer-title").innerText = "Workout finished";
    }
    
    if (exercise.type === "timer") {
        done.style.display = "none";
        start.style.display = "flex";
        startTimer(exercise.duration);
    } else if (exercise.type === "reps") {
         console.log("Open timer started")
        done.style.display = "flex";
        start.style.display = "none";
        countUP()
    }
}

function startTimer(duration) {
    if (currentMode == MODE_NOT_STARTED) {

        beep();

        currentMode = MODE_STARTED;
        updateIcon(ICON_PAUSE)
        
        if (currentTime == 0) {
            currentTime = duration;
            console.log("Timer started")
        } else console.log("Timer continued")
        interval = setInterval(function() {
            if (currentTime > 0) {
                currentTime -= 1;
                timer.innerHTML = formatTime(currentTime);
            } else {
                beep();
                console.log("Timer finished")
                updateTimer()
                currentExercise ++;
                updateExercise();
            }
        }, 1000);
    } else {
        updateIcon(ICON_START)
        console.log("Pause state")
        currentMode = MODE_NOT_STARTED
        clearInterval(interval);
    }
}

function countUP() {
    interval = setInterval(function() {
        currentTime += 1;
        timer.innerHTML = formatTime(currentTime);
    }, 1000);
}

function doneExercise() {
    console.log("Open timer finished")
    currentExercise++;
    updateTimer()
    updateExercise();
}

function updateTimer(type) {
    if (type == 0) {
        currentExercise = 0
        document.getElementById("next-timer-title").innerText = workoutPlan[currentExercise + 1].exercise;
        document.getElementById("current-timer-title").innerText = workoutPlan[currentExercise].exercise;
    }
    timer.innerHTML = formatTime(workoutPlan[currentExercise].duration)
    clearInterval(interval)
    currentTime = 0
    updateIcon(ICON_START)
    currentMode = MODE_NOT_STARTED
    
    
}

function updateIcon(icon) {
    iconStart = document.getElementById('icon-s');
    if (icon == ICON_START) {
        iconStart.classList.remove('fa-pause');
        iconStart.classList.add('fa-play');
    } else {
        iconStart.classList.remove('fa-play');
        iconStart.classList.add('fa-pause');
    }
}