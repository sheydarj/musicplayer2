const menu = document.getElementById('hamburger')
const ul = document.getElementById('ul')
const pic1 = document.getElementById('pic1')
const play = document.getElementById('play')
const icon = document.getElementById('icon')
const pic = document.getElementById('pic')
const music = document.getElementById('music')
const h2 = document.querySelector('#music>h2')
const txt = document.getElementById('txt')
// const audio = document.getElementById('audio')
const timer = document.getElementById('playing-time')
const duration = document.getElementById('music-duration')
const seekbar = document.getElementById('seekbar');

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


//  first way ///////////////////////////////////////////////////////////////////////////////

// let audios = document.querySelectorAll('audio');

// function kiMigireJato() {
//     if (document.getElementById('kiMigireJato').paused) {
//         audios.forEach((audio)=>{
//             audio.pause()
//         })
//         document.getElementById('kiMigireJato').play()
//     } else {
//         document.getElementById('kiMigireJato').pause()
//     }
// }

// function MonoPlay() {
//     if (document.getElementById('MonoPlay').paused) {
//         audios.forEach((audio)=>{
//             audio.pause()
//         })
//         document.getElementById('MonoPlay').play()
//     } else {
//         document.getElementById('MonoPlay').pause()
//     }
// }

// function EmmaPeters() {
//     if (document.getElementById('EmmaPeters').paused) {
//         audios.forEach((audio)=>{
//             audio.pause()
//         })
//         document.getElementById('EmmaPeters').play()
//     } else {
//         document.getElementById('EmmaPeters').pause()
//     }
// }

// function Nf() {
//     if (document.getElementById('Nf').paused) {
//         audios.forEach((audio)=>{
//             audio.pause()
//         })
//         document.getElementById('Nf').play()
//     } else {
//         document.getElementById('Nf').pause()
//     }
// }
// end of first way ///////////////////////////////////////////////////////////////////////////////

// second way ///////////////////////////////////////////////////////////////////////////////
let audios = document.querySelectorAll('audio');
const audioList = document.querySelectorAll('#ul>li')
// audioList.forEach((li, index) => {
//     li.addEventListener('click', (e) => {
//         if (audios[index].paused) {
//             audios.forEach((audio) => {
//                 audio.pause()
//             })
//             audios[index].play()
//             document.getElementById('music-name').innerHTML = audios[index].dataset.name;
//         } else {
//             audios[index].pause()
//         }
//     })
// })


let playing = false;
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
// end of second way ///////////////////////////////////////////////////////////////////////////////

// play && pause /////////////////////////////////////
let musicIndex = 0;
function playPauseBtn() {
    if (audios[musicIndex].paused) {
        startInterval()

        animateSeekBar(1000);
        audios[musicIndex].play()
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    } else {
        audios[musicIndex].pause()
        clearInterval(timerInterval)
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
}
// end of play && pause /////////////////////////////////////


// forward && rewind CONTROLLS ///////////////////////////////
let forwardBtn = document.getElementById('forward');
let rewindBtn = document.getElementById('rewind');
forwardBtn.addEventListener('click', () => {
    // if (playing) {
    //     audios.forEach((audio) => {
    //         audio.pause()
    //     })
    // }
    if (musicIndex + 1 < audios.length) {
        getMinutes(audios[musicIndex+1].duration)
        startCounter(audios[musicIndex+1].duration)
        audios[musicIndex].pause()
        musicIndex++
        audios[musicIndex].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    } else {
        audios[musicIndex].pause()
        musicIndex = 0;
        audios[musicIndex].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    }
})
rewindBtn.addEventListener('click', () => {
    if (musicIndex < audios.length && musicIndex > 0) {
        getMinutes(audios[musicIndex-1].duration)
        startCounter(audios[musicIndex-1].duration)
        
        audios[musicIndex].pause()
        musicIndex--
        audios[musicIndex].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    } else {
        audios[musicIndex].pause()
        musicIndex = audios.length - 1;
        audios[musicIndex].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    }
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

let progress;

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


function animateSeekBar(target) {
    let start = 0;
    const duration = audios[musicIndex]?.duration * 1000; // 2 seconds
    let step = () => {
        progress = Math.min(start + (performance.now() / duration) * 100, target);
        seekbar.value = progress;
        if (progress < target) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

window.onload = function () {
    let audio = document.getElementsByClassName('audio')
    document.getElementById('music-name').innerHTML = audio.item(0).dataset.name;
    getMinutes(audio.item(0).duration)

}

// function animateSeekBar() {
//     if (progress <= 100) {
//         seekbar.value = progress;
//         progress++;
//         requestAnimationFrame(animateSeekBar);
//     }
// }


