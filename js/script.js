const menu = document.getElementById('hamburger')
const ul = document.getElementById('ul')
const pic1 = document.getElementById('pic1')
const play = document.getElementById('play')
const icon = document.getElementById('icon')
const pic = document.getElementById('pic')
const music = document.getElementById('music')
const h2 = document.querySelector('#music>h2')
const txt = document.getElementById('txt')
const audio = document.getElementById('audio')
// const playBtn = document.getElementById('playBtn')

let mod = true;
let playing = false;
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


// let playing = false;
let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
// end of second way ///////////////////////////////////////////////////////////////////////////////

// play && pause /////////////////////////////////////
let musicIndex = 0;
function playPauseBtn() {

    if (!playing) {
        playing = true;
        audios[musicIndex].play()
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
    } else {
        playing = false;
        audios[musicIndex].pause()
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
}
// end of play && pause /////////////////////////////////////


// forward && rewind CONTROLLS ///////////////////////////////
let forwardBtn = document.getElementById('forward');
let rewindBtn = document.getElementById('rewind');
forwardBtn.addEventListener('click', () => {
    audios[musicIndex].pause()
    if (musicIndex + 1 < audios.length) {
        musicIndex++;
    } else {
        musicIndex = 0;
    }
    if (playing) {
        audios[musicIndex].play()
    }
    document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
})
///frwrd btn end
///backward btn
rewindBtn.addEventListener('click', () => {
    audios[musicIndex].pause()
    if (musicIndex < audios.length && musicIndex > 0) {
        musicIndex--;
    } else {
        musicIndex = audios.length - 1;
    }

    if (playing) { audios[musicIndex].play() }

    document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
})
// end of forward && rewind CONTROLLS ///////////////////////////////

audioList.forEach((li, index) => {
    li.addEventListener('click', (e) => {
        // hide ul list
        ul.classList.toggle('hidden')
        play.classList.toggle('hidden')
        icon.classList.toggle('hidden')
        // end of hide ul list
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        audios[musicIndex].pause()
        musicIndex = index;
        audios[index].play()
        playing = true;
        document.getElementById('music-name').innerHTML = audios[musicIndex].dataset.name;
        // playPauseBtn()
    })
})