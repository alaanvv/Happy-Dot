// PEGANDO ELEMENTOS HTML

const dot = document.querySelector('.dot')
const antidot = document.querySelector('.antidot')
const points = document.querySelector('.pontos')
const exorcista = document.querySelector('.exorcista')
const recompensas = document.querySelector('.recompensas')
const titulo = document.querySelector('.rectit')
const up1 = document.querySelector('.up1')
const up2 = document.querySelector('.up2')

// VARIÁVEIS GLOBAIS

let px = 0
let py = 0
let antipx = 0
let antipy = 0
let timer = 1000
let tempo = 3000
let pontos = 0
let maxx = 93
let maxy = 64
let jsOn = false
let dotOn = true

// SONS

const grito = new Audio()
grito.src = '../Bolinha/assets/audio/grito.mp3'

// FUNÇÕES

function attXY() {
    random()
    px = x
    py = y
}

function attAntiXAntiY() {
    random()
    antipx = x
    antipy = y
}

function attDot() {
    attXY()
    inv()
    dot.style.marginLeft = `${px}%`
    dot.style.marginTop = `${py}%`
}

function attAntiDot() {
    attAntiXAntiY()
    antidot.classList.add('vis')
    antidot.style.marginLeft = `${antipx}%`
    antidot.style.marginTop = `${antipy}%`
}

function attNivel() {
    if (pontos < 5) {
        timer = 1000
        tempo = 3000
        dot.classList.remove('dot2')
        dot.classList.remove('dot3')
    }

    if (pontos >= 5 && pontos < 10) {
        jsOn = true
        timer = 500
        tempo = 2000
        dot.classList.add('dot2')
    }

    if (pontos >= 10 && pontos < 25) {
        timer = 300
        tempo = 1000
        dot.classList.add('dot3')
    }

    if (pontos == 25) recompensa()

    if (pontos == 50) onAntiDot()

    if (pontos == 79) points.innerHTML = `★ 666`
}

function attPoints() {
    pontos++
    points.innerHTML = `★ ${pontos}`
    attNivel()
}

function random() {
    x = Math.random() * (maxx - 0) + 0
    y = Math.random() * (maxy - 0) + 0
    return x, y
}

function inv() {
    dot.classList.add('inv')
    setTimeout(() => {
        jumpscare()
        if (dotOn)
            dot.classList.remove('inv')
    }, timer)
}

function jumpscare() {
    if (jsOn) {
        let checker = pontos
        setTimeout(e => {
            if (checker == pontos) {
                grito.play()
                exorcista.classList.add('vis')
            }
        }, tempo)
    }
}

function recompensa() {
    jsOn = false
    dotOn = false
    recompensas.classList.add('vis')
    up1.addEventListener('click', () => {
        dot.classList.add('dotgrade')
        fecharRecompensa()
    })
    up2.addEventListener('click', () => {
        tempo = 1500
        fecharRecompensa()
    })
}

function fecharRecompensa() {
    jsOn = true
    dotOn = true
    recompensas.classList.remove('vis')
    attDot()
}

function chance() {
    chanceNum = Math.random() * (100 - 0) + 0
    return chanceNum
}

function onDistracoes() {
    setInterval(() => {
        chance()
        if (chanceNum < 50) {
            mostrarImg(chanceNum)
        }
    }, 5000);
}

function mostrarImg(num) {
    if (num >= 0 && num < 10) {
        img1.classList.add('vis')
        setTimeout(() => {
            img1.classList.remove('vis')
        }, 2500)
    }
    if (num >= 10 && num < 20) {
        img2.classList.add('vis')
        setTimeout(() => {
            img2.classList.remove('vis')
        }, 2500)
    }
    if (num >= 20 && num < 30) {
        img3.classList.add('vis')
        setTimeout(() => {
            img3.classList.remove('vis')
        }, 2500)
    }
    if (num >= 30 && num < 40) {
        img4.classList.add('vis')
        setTimeout(() => {
            img4.classList.remove('vis')
        }, 2500)
    }
    if (num >= 40 && num < 50) {
        img5.classList.add('vis')
        setTimeout(() => {
            img5.classList.remove('vis')
        }, 2500)
    }
}

function onAntiDot() {
    antidot.addEventListener('mouseenter', e => {
        grito.play()
        exorcista.classList.add('vis')
    })
    attAntiDot()
    setInterval(() => {
        attAntiDot()
    }, 1000);
}

// EVENT LISTENER

dot.addEventListener('mouseenter',()=>{
    attDot()
    attPoints()
})

window.addEventListener('load',()=>{
    attDot()
})
