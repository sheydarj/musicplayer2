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
const pause = document.getElementById('pause')
const back = document.getElementById('back')
const next = document.getElementById('next')
let currentIndex;
let myAudios = [];
const heart = document.getElementById('heart')
const shuffle = document.getElementById('shuffle')
const repeat = document.getElementById('repeat')
const dots = document.getElementById('dots')





const audioList = [
    {
        id: 'queen',
        title: 'THE ARRIVAL OF THE QUEEN OF SHEBA',
        src: './music/01. HANDEL- THE ARRIVAL OF THE QUEEN OF SHEBA (Solomon).mp3',
    },
    {
        id: 'vivaldi',
        title: 'LE QUATTRO STAGIONI',
        src: "./music/02. VIVALDI- LE QUATTRO STAGIONI- i. Allegro (Concerto No. 1 in E 'La primavera').mp3"
    },

    {

        id: 'mozart',
        title: 'HORN CONCERTO NO.4',
        src: './music/04. MOZART- HORN CONCERTO NO.4 IN E FLAT K495- iii. Rondo (Allegro vivace).mp3',
    }
]





let currentMusic = {
    id: audioList[0].id,
    title: audioList[0].title
}


let mod = true;


menu.addEventListener('click', () => {
    console.log('click shooooooood', mod)

    if (mod) {
        menu.style.color = 'red'
        pic.style.height = '150px'
        music.style.top = '25%'
        h2.style.color = 'black'
        txt.style.height = '0px'

        mod = false
    } else {
        menu.style.color = 'black'
        pic.style.height = '280px'
        music.style.top = '57%'
        h2.style.color = 'white'
        txt.style.height = '200px'


        mod = true
    }


    ul.classList.toggle('hidden')
    pic1.classList.toggle('hidden')
    play.classList.toggle('hidden')
    icon.classList.toggle('hidden')

})



function backClick() {
    console.log('feri jone', currentIndex);

    if (currentIndex > 0) {
        myAudios[currentIndex].pause()
        currentIndex -= 1
        myAudios[currentIndex].play()
    }
}
function nextClick() {
    console.log('ho', currentIndex);

    if (currentIndex < myAudios.length - 1) {
        myAudios[currentIndex].pause()
        currentIndex += 1
        myAudios[currentIndex].play()
    }
}
back.onclick = function () {
    backClick()
    console.log('back');

}
next.onclick = function () {
    nextClick()
    console.log('next');

}

function playerToggle(id, title) {
    currentMusic = {
        id, title
    }
    if (document.getElementById(id).paused) {
        document.getElementById(id).play()

    } else {
        document.getElementById(id).pause()
    }
    console.log('hi', currentMusic);

    const listItem = ul.querySelectorAll('li')
    console.log(listItem)
    listItem.forEach((item, index) => {
        const au = item.childNodes[1]
        myAudios.push(au)
        myAudios.forEach((item, index) => {
            console.log('iteeeeeeeemmmm', item, index)
            item.addEventListener("play", (e) => {
                console.log('taraaaaa', index);
                currentIndex = index

            })
        })

    })

}

let currentAudio = null;

function addItem(title, src, id) {
    const li = document.createElement('li')
    ul.appendChild(li)
    li.innerText = title
    let audioTag = document.createElement('audio')
    audioTag.setAttribute('src', src)
    audioTag.setAttribute('id', id)
    li.appendChild(audioTag)
    // li.style.displaye='flex'
    // li.style.alignItems='center'
    // li.style.justifyContent='center'
    li.onclick = function () {

        if (currentAudio && currentAudio !== audioTag) {
            currentAudio.pause();
        }
        currentAudio = audioTag
        playerToggle(id, title)

    }
}










window.onload = function () {
    audioList.forEach((item) => {
        console.log('audioooooooo', item)
        addItem(item.title, item.src, item.id)


    })
    h2.innerText = currentMusic?.title
}


playBtn.onclick = function () {
    console.log('play shod')
    document.getElementById(currentMusic?.id).play()
    playBtn.style.display = ('none')
    pause.style.display = ('block')

}


pause.onclick = function () {
    console.log('pause shod')
    document.getElementById(currentMusic?.id).pause()
    playBtn.style.display = ('block')
    pause.style.display = ('none')

}

let socialFlag = true;

heart.onclick = function () {
    if (mod) {
        heart.style.color = 'red'
        socialFlag = false
    } else {
        heart.style.color = '#6d6d6d'
        socialFlag = true

    }
}

shuffle.onclick = function () {
    if (mod) {
        shuffle.style.color = 'red'
        socialFlag = false
    } else {
        shuffle.style.color = '#6d6d6d'
        socialFlag = true

    }
}
repeat.onclick = function () {
    if (mod) {
        repeat.style.color = 'red'
        socialFlag = false
    } else {
        repeat.style.color = '#6d6d6d'
        socialFlag = true

    }
}
dots.onclick = function () {
    if (mod) {
        dots.style.color = 'red'
        socialFlag = false
    } else {
        dots.style.color = '#6d6d6d'
        socialFlag = true

    }
}

// top-[57%] left-[35%]