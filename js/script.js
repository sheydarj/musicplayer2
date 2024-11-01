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
const playBtn = document.getElementById('playBtn')

let mod = true;

menu.addEventListener('click', () => {

    if (mod) {
        menu.style.color = 'red';
        pic.style.height = '150px'
        music.style.top = '15%'
        h2.style.color = 'black'
        txt.style.height = '0px'
        mod = false
    } else {
        menu.style.color = 'black';
        pic.style.height = '280px'
        music.style.top = ''
        h2.style.color = 'white'
        txt.style.height = '200px'
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



audioList.forEach((li, index) => {
    li.addEventListener('click', (e) => {
        if (audios[index].paused) {
            audios.forEach((audio) => {
                audio.pause()
            })
            audios[index].play()
        } else {
            audios[index].pause()
        }
    })
})
// end of second way ///////////////////////////////////////////////////////////////////////////////