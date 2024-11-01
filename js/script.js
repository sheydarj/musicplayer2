const menu = document.getElementById('hamburger')
const ul = document.getElementById('ul')
const pic1 = document.getElementById('pic1')
const play = document.getElementById('play')
const icon = document.getElementById('icon')
const pic = document.getElementById('pic')
const music = document.getElementById('music')
const h2 = document.querySelector('#music>h2')
const txt = document.getElementById('txt')
const timer = document.getElementById('playing-time')
const duration = document.getElementById('music-duration')

let mod = true;

menu.addEventListener('click', () => {

    if (mod) {
        menu.style.color = 'red';
        pic.style.height = '150px'
        music.style.top = '15%'
        h2.style.color = 'white'
        // txt.style.height = '0px'
        mod = false
    } else {
        menu.style.color = 'black';
        pic.style.height = '280px'
        music.style.top = ''
        h2.style.color = 'white'
        // txt.style.height = '200px'
        mod = true
    }
    ul.classList.toggle('hidden')
    pic1.classList.toggle('hidden')
    play.classList.toggle('hidden')
    icon.classList.toggle('hidden')

})
// second way ///////////////////////////////////////////////////////////////////////////////
let audios = document.querySelectorAll('audio');
const audioList = document.querySelectorAll('#ul>li')

let playing = false;
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
// end of second way ///////////////////////////////////////////////////////////////////////////////

// play && pause /////////////////////////////////////
let musicIndex = 0;
function playPauseBtn() {
    if (audios[musicIndex].paused) {
        startInterval()
        audios[musicIndex].play()
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
        playing = true;
    } else {
        audios[musicIndex].pause()
        clearInterval(timerInterval)
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        playing = false;
    }
}
// end of play && pause /////////////////////////////////////


// forward && rewind CONTROLLS ///////////////////////////////
let forwardBtn = document.getElementById('forward');
let rewindBtn = document.getElementById('rewind');
forwardBtn.addEventListener('click', () => {

    if (playing && musicIndex + 1 < audios.length) {
        audios[musicIndex].pause()
        musicIndex++
        audios[musicIndex].play()
        getMinutes(audios[musicIndex].duration)
        playing = true;
    } else if (!playing && musicIndex + 1 < audios.length) {
        audios[musicIndex].pause()
        getMinutes(audios[musicIndex].duration)
        musicIndex++
        playing = false;
    } else {
        if (playing) {
            audios[musicIndex].pause()
            musicIndex = 0;
            audios[musicIndex].play()
            getMinutes(audios[musicIndex].duration)
            playing = true;
        } else {
            audios[musicIndex].pause()
            getMinutes(audios[musicIndex].duration)
            musicIndex = 0;
            playing = false;
        }
    }
    document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
})
rewindBtn.addEventListener('click', () => {
    if (musicIndex < audios.length && musicIndex > 0 && playing) {
        audios[musicIndex].pause()
        musicIndex--
        audios[musicIndex].play()
        getMinutes(audios[musicIndex].duration)
        playing = true;
    } else if (musicIndex < audios.length && musicIndex > 0 && !playing) {
        audios[musicIndex].pause()
        getMinutes(audios[musicIndex].duration)
        musicIndex--
        playing = false;
    } else {
        if (playing) {
            audios[musicIndex].pause()
            musicIndex = audios.length - 1;
            audios[musicIndex].play()
            getMinutes(audios[musicIndex].duration)
            playing = true;
        } else {
            audios[musicIndex].pause()
            getMinutes(audios[musicIndex].duration)
            musicIndex = audios.length - 1;
            playing = false;
        }
    }
    document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
})
// end of forward && rewind CONTROLLS ///////////////////////////////

let timerInterval;
audioList.forEach((li, index) => {
    li.addEventListener('click', (e) => {
        let audio = document.getElementsByClassName('audio')
        changeAudioSource(audio.item(index))
        resetTimer();
        let audioDuration = audio.item(index).duration
        getMinutes(audioDuration)
        startCounter(audioDuration)
        // hide ul list
        ul.classList.toggle('hidden')
        play.classList.toggle('hidden')
        icon.classList.toggle('hidden')
        // end of hide ul list
        audios[musicIndex].pause()
        musicIndex = index;
        audios[index].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
        // playPauseBtn()
    })
})


function getMinutes(s) {
    const minutes = Math.floor(s / 60)
    const second = Math.floor((((s / 60) - minutes) * 60))
    duration.innerText = `${minutes.toString()}:${second.toString()}`

}


function startCounter(s) {

    let secondsElapsed = 0;
    timer.innerText = ""
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const seconds = String(secondsElapsed % 60).padStart(2, '0');
        timer.innerText = `${minutes}:${seconds}`;

        if (secondsElapsed >= s) {
            clearInterval(timerInterval);
            audio.pause();
        }
    }, 1000);


}

function startInterval() {
    timerInterval = setInterval(() => {
        let current = audios[musicIndex].currentTime.toFixed(0)
        const minutes = String(Math.floor(current / 60)).padStart(2, '0');
        const seconds = String(current % 60).padStart(2, '0');
        timer.innerText = `${minutes}:${seconds}`;
    }, 1000)
}

function resetTimer() {
    clearInterval(timerInterval);
    timer.innerText = '00:00';
}

function changeAudioSource(newSource) {
    newSource.currentTime = 0
    resetTimer();
}


window.onload = function () {
    let audio = document.getElementsByClassName('audio')
    document.getElementById('music-name').innerHTML = audio.item(0).dataset.name;
    getMinutes(audio.item(0).duration)

}
