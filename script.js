var start = document.querySelector('.start');
var stop = document.querySelector('.stop');
var reset = document.querySelector('.reset');
var repeat = document.querySelector('.repeat');
var lap = document.querySelector('.lap');
var lapContainer = document.querySelector('.lapContainer');
var mil = document.querySelector('.milis');
var sec = document.querySelector('.secs');
var min = document.querySelector('.mins');
var first_time = true;
var flag = false;

stop.style.display = 'none';
lap.style.display = 'none';
reset.style.display = 'none';
repeat.style.display = 'none';

function createTimeSection(timeType) { 
    var lapTime = document.createElement('div');
    lapTime.classList.add('lapSection');
    lapBlock.appendChild(lapTime);
    lapTime.innerHTML = (timeType);
}

function createTimeBlock(type) {
    lapBlock = document.createElement('div');
    lapBlock.classList.add('lapBlock');
    lapContainer.appendChild(lapBlock);
    var lapText = document.createElement('div');

    lapText.classList.add('lapText');
    lapBlock.appendChild(lapText);
    lapText.innerHTML = (type);

    createTimeSection('-');
    createTimeSection(minutes);
    createTimeSection(':');
    createTimeSection(seconds);
    createTimeSection(':');
    createTimeSection(milliseconds);
}

function displayStopButton() {
    start.style.display = 'none';
    stop.style.display = 'block';
    lap.style.display = 'block';
    reset.style.display = 'block';
    repeat.style.display = 'none';
}

function displayStartButton() {
    start.style.display = 'none';
    stop.style.display = 'none';
    lap.style.display = 'block';
    repeat.style.display = 'block';
    reset.style.display = 'block';
}

function startStopwatch() {
    flag = true;

    if (first_time) {
      initialDate = new Date;
      first_time = false;
    } else {
      initialDate.setMilliseconds(initialDate.getMilliseconds() + (new Date - pauseTime));
    }
  } 

function getTime() {

    var currentDate = new Date;
    timer = new Date (currentDate - initialDate);
    
    milliseconds = timer.getMilliseconds();
    seconds = timer.getSeconds();
    minutes = timer.getMinutes();
  
    if (milliseconds < 100) {
      milliseconds = '0' + milliseconds;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    } 
    
    if (minutes < 10) {
      minutes = '0' + minutes;
    } else {
        stopTimer();
    }

}

function counter() {
    getTime();
    mil.innerHTML = milliseconds;
    sec.innerHTML = seconds;
    min.innerHTML = minutes;
}

function displayTimer() {
    timerId = setInterval(counter, 10);
}

function stopTimer() {
    clearInterval(timerId);
    getTime();
    flag = false;
    pauseTime = new Date;
}

function newLap() {
    if (flag == true) {
        getTime();
        createTimeBlock('Отметка');
    } else {
        var lapText = document.createElement('div');

        lapBlock = document.createElement('div');
        lapBlock.classList.add('lapBlock');
        lapContainer.appendChild(lapBlock);
    
        lapText.classList.add('lapText');
        lapBlock.appendChild(lapText);
        lapText.innerHTML = ('Возобновите секундомер');
    }
}

function resetTimer() {
    flag = false;
    first_time = true;
    clearInterval(timerId);

    start.style.display = 'block';
    stop.style.display = 'none';
    lap.style.display = 'none';
    reset.style.display = 'none';
    repeat.style.display = 'none';

    mil.innerHTML = '00';
    min.innerHTML = '00';
    sec.innerHTML = '00';

    document.querySelector('.lapContainer').innerHTML = '';
}

start.addEventListener('click', startStopwatch);
start.addEventListener('click', displayStopButton);
start.addEventListener('click', displayTimer);
lap.addEventListener('click', newLap);
stop.addEventListener('click', stopTimer);
stop.addEventListener('click', displayStartButton);
reset.addEventListener('click', resetTimer);
repeat.addEventListener('click', startStopwatch);
repeat.addEventListener('click', displayStopButton);
repeat.addEventListener('click', displayTimer);