const menu=document.getElementById('hamburger')
const ul=document.getElementById('ul')
const pic1=document.getElementById('pic1')
const play=document.getElementById('play')
const icon=document.getElementById('icon')
const pic=document.getElementById('pic')
const music=document.getElementById('music')
const h2=document.querySelector('#music>h2')
const txt=document.getElementById('txt')
const audio=document.getElementById('audio')
const playBtn=document.getElementById('playBtn')

let mod = true;
audio.play()

menu.addEventListener('click' , ()=>{

    if(mod){
        menu.style.color='red';
        pic.style.height='150px'
        music.style.top='15%'
        h2.style.color='black'
        txt.style.height='0px'



        mod = false
    }else{
        menu.style.color='black';
        pic.style.height='280px'
        music.style.top=''
        h2.style.color='white'
        txt.style.height='200px'



        mod = true
    }
    ul.classList.toggle('hidden')
    pic1.classList.toggle('hidden')
    play.classList.toggle('hidden')
    icon.classList.toggle('hidden')



})
// playBtn.addEventListener('click', () => {
//     audio.setAttribute('controls')
//     // if (audio.paused) {
//     //     audio.play()
//     // }
// })
// 