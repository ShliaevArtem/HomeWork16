var button = document.querySelector('.start');
var reset = document.querySelector('.reset');
var lap = document.querySelector('.lap');
var lapContainer = document.querySelector('.lapContainer');
var mil = document.querySelector('.milis');
var sec = document.querySelector('.secs');
var min = document.querySelector('.mins');
var first_time = true;
var flag = false;

lap.style.display = 'none';
reset.style.display = 'none';

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
    lap.style.display = 'block';
    reset.style.display = 'block';
}

function displayStartButton() {
    lap.style.display = 'block';
    reset.style.display = 'block';
}

function startStopwatch() {
    flag = true;

    if (first_time) {
      initialDate = new Date();
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
    lap.style.display = 'none';
    reset.style.display = 'none';

    mil.innerHTML = '00';
    min.innerHTML = '00';
    sec.innerHTML = '00';

    document.querySelector('.lapContainer').innerHTML = '';
}

button.onclick = function() {
var elem = button.getAttribute('data-state');

    switch (elem) {
        case 'play': 
            startStopwatch();
            displayStopButton();
            displayTimer();
            button.setAttribute('data-state', 'stop');
            button.innerHTML = 'Остановить';
            break;

        case 'stop':
            stopTimer();
            displayStartButton();
            button.setAttribute('data-state', 'repeat');
            button.innerHTML = 'Возобновить';
            break;

        case 'repeat':
            startStopwatch();
            displayStopButton();
            displayTimer();
            button.setAttribute('data-state', 'stop');
            button.innerHTML = 'Остановить';
            break;
    }
  };

lap.addEventListener('click', newLap);
reset.addEventListener('click', resetTimer);
