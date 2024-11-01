let progressBar = document.getElementById('progress-bar');
let progress = document.getElementById('progress');
let progressPoint = document.getElementById('progress-point');
let progressBarWidth = progressBar.offsetWidth;
let progressWidth = progress.offsetWidth;
// let playing = false;

///////////////////////////////// change progress ///////////////////////////////////////////////////

let initialWidth = 0; // initial width of progress bar
let startX = 0 // initial position of mouse click
let currentProgressWith;
let dragging = false;

progressBar.addEventListener('mousedown', () => {
    progress.style.width = `${event.offsetX}px`;
    startX = event.clientX;
    dragging = true;
    initialWidth = parseFloat(progress.style.width) || 0; //  get the width of progress
    calcAudioCurrentTime(initialWidth)
})

document.addEventListener('mousemove', () => {
    if (dragging) {
        progress.style.transition = 'none';
        let deltaX = event.clientX - startX;
        currentProgressWith = initialWidth + deltaX;

        // filter progress to stay within the bounds of the progress bar || you can don't use Math.max but you must use Math.min 

        // Math.min(a,b) // return the smallest
        // Math.min(currentProgressWith , progressBarWidth) // return the smallest of the two values => if the progress (currentProgressWith variable) get wider than the progress bar, it will return progressBarWidth else it will return currentProgressWith
        currentProgressWith = Math.max(0, Math.min(currentProgressWith, progressBarWidth));

        progress.style.width = `${currentProgressWith}px`
        calcAudioCurrentTime(currentProgressWith)
    }
})

document.addEventListener('mouseup', () => {
    dragging = false;
})

///////////////////////////// end of change progress ////////////////////////////////////////////


///////////////////////////////// audio controls ////////////////////////////////////////////
// let audio = document.querySelector('audio');
let audioDuration;

function calcAudioCurrentTime(clickX) {
    // Get the total duration of the audio
    audioDuration = audio.duration

    // Calculate the clicked position as a percentage of progressBarWidth
    // let clickX = event.clientX;
    let newTime = (clickX / progressBarWidth) * audioDuration;

    // Set the audio's current time to the calculated new time
    audio.currentTime = newTime;
}
///////////////////////////////// end of audio controls ////////////////////////////////////////////

///////////////////////////////// audio details ////////////////////////////////////////////
let playingTime = document.getElementById('playing-time');
let musicDuration = document.getElementById('music-duration');
let musicName = document.getElementById('music-name');

audio.ontimeupdate = function () {
    let min = Math.floor(audio.currentTime / 60);
    let sec = Math.floor(audio.currentTime % 60);

    //////firs way/////
    // let formatSec = sec < 10 ? `0${sec}` : sec;
    // let formatMin = min < 10 ? `0${min}` : min;
    // playingTime.textContent = `${formatMin}:${formatSec}`
    //////end of firs way/////

    ////better way////
    playingTime.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    ////end of better way////

    if (audio.currentTime >= audio.duration) {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        playing = false;
    }
}

// loademetadata => when audio loaded
audio.addEventListener('loadedmetadata', () => {
    let min = Math.floor(audio.duration / 60);
    let sec = Math.floor(audio.duration % 60);

    musicDuration.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
})

musicName.textContent = audio.dataset.name;


///////////////////////////////// end of audio details ////////////////////////////////////////////


///////////////////////////////// Play and Pause Btn Func ////////////////////////////////////////////
// let playBtn = document.getElementById('play-btn');
// let pauseBtn = document.getElementById('pause-btn');

// you can use audio.played || audio.paused || audio.ended Instead of my way
function playPauseBtn() {
    audios.forEach((audio) => {
        if (audio.currentTime >= audio.duration) {
            audio.currentTime = 0;
            playing = true;
            audio.play();
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';

        } else if (!playing) {
            audio.play();
            playing = true;
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        } else {
            audio.pause();
            playing = false;
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    })
}

///////////////////////////////// end of Play and Pause Btn Func ////////////////////////////////////////////

///////////////////////////////// Change progress onTime ////////////////////////////////////////////
// Synchronize progress with audio playback
audio.addEventListener('timeupdate', () => {
    const progressRatio = audio.currentTime / audio.duration;
    progress.style.width = `${progressRatio * progressBarWidth}px`;
});
///////////////////////////////// end of Change progress onTime ////////////////////////////////////////////