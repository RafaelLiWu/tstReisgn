var move = document.getElementById("carta"),
    itemX = 0,
    itemY = 0,
    positionX_inicial = document.getElementById("moveBackground"),
    positionY_inicial = document.getElementById("moveBackground"),
    direction = "",
    dependeId = 0,
    depende = false,
    indiceGame = 0,
    sound = true;

const soundCartaJogada = new Audio("audios/CartaJogada.wav"),
    soundCartaRetornando = new Audio("audios/CartaPlace.wav"),
    dispositivo = (window.innerWidth > 600) ? "desktop" : "mobile"


function next(arr, i) {
    let personagemNome = arr[i].personagem
    let texto = arr[i].texto
    let personagemImagem = arr[i].personagemImagem
    if (personagemImagem == "") {
        personagemImagem = "p1.jpeg"
    }
    let html = `
                <div class="gam-texto">
                    ${texto}
                </div>
                <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemImagem}');">
    
                        </div>
                        <div class="gam-pessoa-img-back">
    
                        </div>
                    <div class="gam-pessoa-img-fundo" id="moveBackground">
                    </div>
                </div>
                <div class="gam-nome">
                    ${personagemNome}
                </div>
            `

    setTimeout(() => {
        document.querySelector(".gam-pessoa-img").style.transform = "rotateY(0deg)";
        if (dispositivo == "desktop") {
            move.addEventListener("mousedown", dragStart)
        } else {
            move.addEventListener("touchstart", dragStart)
        }
    }, 100)

    $(".ga-middle").html(html)

    move = document.getElementById("carta")
    direction = ""
    positionX_inicial = document.getElementById("moveBackground").offsetLeft
    positionY_inicial = document.getElementById("moveBackground").offsetTop
}



function dragStart(e) {
    if (sound) {
        soundCartaRetornando.pause()
        soundCartaRetornando.currentTime = 0
        setTimeout(() => {
            soundCartaRetornando.play()
        }, 50)
    }
    document.querySelector(".gam-pessoa-img").style.transition = "none";

    if (dispositivo == "desktop") {
        itemX = e.pageX - move.offsetLeft;
        itemY = e.pageY - move.offsetTop;

        addEventListener("mousemove", dragMove);
        addEventListener("mouseup", dragEnd);
    } else {
        itemX = e.targetTouches[0].pageX - move.offsetLeft;
        itemY = e.targetTouches[0].pageY - move.offsetTop;

        addEventListener("touchmove", dragMove);
        addEventListener("touchend", dragEnd);
    }
}



function dragMove(e) {
    let pageX = (e.pageX != undefined) ? e.pageX : e.targetTouches[0].pageX
    let pageY = (e.pageY != undefined) ? e.pageY : e.targetTouches[0].pageY
    move.style.left = (pageX - itemX) + 'px';
    if ((pageY - itemY) > -43 && (pageY - itemY) < 90) {
        move.style.top = (pageY - itemY) + 'px';
    }
    if (pageX - itemX > 40) {
        move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
    } else if (pageX - itemX < 40) {
        move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
    }

    if (pageX - itemX > 50) {
        direction = "direita"
        let textoDireita = Inicio[indiceGame].direita
        if (depende) {
            textoDireita = dependeHistoria[dependeId].direita
        }
        $(".gam-pessoa-img").html(
            `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireita}
                    </div>
                `
        )
    } else if (pageX - itemX < 30) {
        direction = "esquerda"
        let textoEsquerda = Inicio[indiceGame].esquerda
        if (depende) {
            textoEsquerda = dependeHistoria[dependeId].esquerda
        }
        $(".gam-pessoa-img").html(
            `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerda}
                </div>  
                `
        )
    } else if (pageX - itemX > 30 && pageX - itemX < 50) {
        direction = ""
        document.querySelector(".gam-pessoa-img").innerHTML = " "
    }
}

function dragEnd() {
    if (direction === "esquerda") {
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        let rota = Inicio[indiceGame].rota
        if (depende) {
            rota = dependeHistoria[dependeId].searchRota
        }
        if (rota != undefined) {
            let rotaPara = dependeHistoria.filter(x => x.rota == rota)
            depende = true
            dependeId = rotaPara[0].id
            if (depende) {
                next(dependeHistoria, rotaPara[0].id)
            }
        } else {
            depende = false
            indiceGame++
            next(Inicio, indiceGame)
        }
    } else if (direction == "direita") {
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        let rota = Inicio[indiceGame].rota
        if (depende) {
            rota = dependeHistoria[dependeId].searchRota
        }
        if (rota != undefined) {
            let rotaPara = dependeHistoria.filter(x => x.rota == rota)
            depende = true
            dependeId = rotaPara[1].id
            if (depende) {
                next(dependeHistoria, rotaPara[1].id)
            }
        } else {
            depende = false
            indiceGame++
            next(Inicio, indiceGame)
        }
    } else if (direction == "") {
        if (sound) {
            soundCartaRetornando.pause()
            soundCartaRetornando.currentTime = 0
            setTimeout(() => {
                soundCartaRetornando.play()
            }, 50)
        }
        $(move).css("transition", "all cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s")
        setTimeout(() => {
            move.style.transform = "rotate(0deg)";
            $(move).css("left", positionX_inicial)
            $(move).css("top", positionY_inicial)
        }, 100)
        setTimeout(() => {
            $(move).css("transition", "none")
        }, 300)
    }
    if (dispositivo == "desktop") {
        removeEventListener("mousemove", dragMove)
        removeEventListener("mouseup", dragEnd)
    } else {
        removeEventListener("touchmove", dragMove)
        removeEventListener("touchend", dragEnd)
    }
}


next(Inicio, indiceGame)


// Util

if (dispositivo == "mobile") {
    sound = false
    $(".Volume").html(`<i class="fas fa-volume-mute"></i>`)
}

$(".Volume").click(SoundF)

function SoundF() {
    if(sound){
        $(".Volume").html(`<i class="fas fa-volume-mute"></i>`)
        sound = false
    } else {
        $(".Volume").html(`<i class="fas fa-volume-up"></i>`)
        sound = true
    }
}


