var move = document.getElementById("carta"),
    indiceGame = 0,
    indiceIntro = 0,
    itemX = 0,
    itemY = 0,
    positionX_inicial = document.getElementById("moveBackground"),
    positionY_inicial = document.getElementById("moveBackground"),
    transitionX = 0,
    directionIntro = "",
    direction = "",
    pessoaV = document.querySelector(".pessoa-vida").innerHTML,
    vidaV = document.querySelector(".vida-vida").innerHTML,
    armaV = document.querySelector(".arma-vida").innerHTML,
    dinheiroV = document.querySelector(".dinheiro-vida").innerHTML,
    sound = true,
    jaJogou = [],
    randomHistory = Math.floor(Math.random() * missions.length);
jaJogou.push(randomHistory)

const soundCartaJogada = new Audio("audios/CartaJogada.wav"),
    soundCartaRetornando = new Audio("audios/CartaPlace.wav"),
    dispositivo = (window.innerWidth > 600) ? "desktop" : "mobile"



let historias

for (let i = 0; i < missions.length; i++) {
    let naoTem = jaJogou.filter(x => x == i)
    console.log(naoTem)
    if (naoTem) {
        historias = i
        console.log(naoTem)
    } else {
        console.log(naoTem + "Ola")
    }
}



// Em JOGO (Movimentações e Ações)

function dragStart(e) {
    if (sound) {
        soundCartaRetornando.pause()
        soundCartaRetornando.currentTime = 0
        setTimeout(() => {
            soundCartaRetornando.play()
        }, 50)
    }
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
        let textoDireito = missions[randomHistory][indiceGame].acoes[1].texto
        $(".gam-pessoa-img").html(
            `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
        )
    } else if (pageX - itemX < 30) {
        direction = "esquerda"
        let textoEsquerdo = missions[randomHistory][indiceGame].acoes[0].texto
        $(".gam-pessoa-img").html(
            `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerdo}
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
        afetar(missions[randomHistory][indiceGame].acoes[0].pessoa, missions[randomHistory][indiceGame].acoes[0].vida, missions[randomHistory][indiceGame].acoes[0].arma, missions[randomHistory][indiceGame].acoes[0].dinheiro)
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
            let indicePlus = indiceGame + 1
            if (indicePlus < missions[randomHistory].length - 1) {
                indiceGame++
                next(indiceGame)
            } else {
                finish(missions[randomHistory])
            }
        } else {
            morreu()
        }
    } else if (direction == "direita") {
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        afetar(missions[randomHistory][indiceGame].acoes[1].pessoa, missions[randomHistory][indiceGame].acoes[1].vida, missions[randomHistory][indiceGame].acoes[1].arma, missions[randomHistory][indiceGame].acoes[1].dinheiro)
        if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
            let indicePlus = indiceGame + 1
            if (indicePlus < missions[randomHistory].length - 1) {
                indiceGame++
                next(indiceGame)
            } else {
                finish(missions[randomHistory])
            }
        } else {
            morreu()
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



function next(i) {
    let personagemsFoto = missions[randomHistory][i].pessoaImg
    let textoMission = missions[randomHistory][i].texto
    if (personagemsFoto == "") {
        personagemsFoto = "p1.jpeg"
    }
    let html = `
                    <div class="gam-texto">
                        ${textoMission}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemsFoto}');">
                        </div>
                        <div class="gam-pessoa-img-fundo" id="moveBackground">
                        </div>
                    </div>
                    <div class="gam-nome">
                        ${missions[randomHistory][i].pessoaNome}
                    </div>
        `

    // Animação lá do Lapse
    // $("#carta").css("transition", "all ease .5s")
    // setTimeout(() => {
    //     $("#carta").css("background-color", `white`)
    // }, 100);
    // setTimeout(() => {
    //     $("#carta").css("background-image", `url('./personagemsFoto/${personagemsFoto}')`)
    //     $("#carta").css("transition", "none")
    // }, 600)

    $(".ga-middle").html(html)
    if (textoMission.length > 200) {
        $(".gam-texto").css("display", "initial")
    } else {
        $(".gam-texto").css("display", "flex")
    }


    direction = ""

    move = document.getElementById("carta");

    positionX_inicial = document.getElementById("moveBackground").offsetLeft
    positionY_inicial = document.getElementById("moveBackground").offsetTop
    if (dispositivo == "desktop") {
        move.addEventListener("mousedown", dragStart)
    } else {
        move.addEventListener("touchstart", dragStart)
    }

}























// Introdução (Movimentações e Ações)

function introducaoStart(iIntroducao) {
    let personagemsFoto = introducao[iIntroducao].pessoaImg
    if (personagemsFoto == "") {
        personagemsFoto = "p1.jpeg"
    }
    let html = `
            <div class="gam-texto">
                ${introducao[iIntroducao].texto}
            </div>
            <div class="gam-pessoa">
                <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemsFoto}');">
                </div>
                <div class="gam-pessoa-img-fundo" id="moveBackground">
                </div>
            </div>
            <div class="gam-nome">
                ${introducao[iIntroducao].pessoaNome}
            </div>
        `
    $(".ga-middle").html(html)

    move = document.getElementById("carta")
    directionIntro = ""
    positionX_inicial = document.getElementById("moveBackground").offsetLeft
    positionY_inicial = document.getElementById("moveBackground").offsetTop
    if (dispositivo == "desktop") {
        move.addEventListener("mousedown", dragStartIntro)
    } else {
        move.addEventListener("touchstart", dragStartIntro)
    }
}



function dragStartIntro(e) {
    if (sound) {
        soundCartaRetornando.pause()
        soundCartaRetornando.currentTime = 0
        setTimeout(() => {
            soundCartaRetornando.play()
        }, 50)
    }

    if (dispositivo == "desktop") {
        itemX = e.pageX - move.offsetLeft;
        itemY = e.pageY - move.offsetTop;

        addEventListener("mousemove", dragMoveIntro);
        addEventListener("mouseup", dragEndIntro);
    } else {
        itemX = e.targetTouches[0].pageX - move.offsetLeft;
        itemY = e.targetTouches[0].pageY - move.offsetTop;

        addEventListener("touchmove", dragMoveIntro);
        addEventListener("touchend", dragEndIntro);
    }
}




function dragMoveIntro(e) {
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
        directionIntro = "direita"
        let textoDireito = introducao[indiceIntro].acoes[1].texto
        $(".gam-pessoa-img").html(
            `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
        )
    } else if (pageX - itemX < 30) {
        directionIntro = "esquerda"
        let textoEsquerdo = introducao[indiceIntro].acoes[0].texto
        $(".gam-pessoa-img").html(
            `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerdo}
                </div>
                `
        )
    } else if (pageX - itemX > 30 && pageX - itemX < 50) {
        directionIntro = ""
        document.querySelector(".gam-pessoa-img").innerHTML = " "
    }
}

function dragEndIntro() {
    if (directionIntro === "esquerda") {
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        next(indiceGame)
    } else if (directionIntro == "direita") {
        if (sound) {
            soundCartaJogada.pause()
            soundCartaJogada.currentTime = 0
            setTimeout(() => {
                soundCartaJogada.play()
            }, 50)
        }
        if (indiceIntro < introducao.length - 1) {
            indiceIntro++
            introducaoStart(indiceIntro)
        } else {
            next(indiceGame)
        }
    } else if (directionIntro == "") {
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
        removeEventListener("mousemove", dragMoveIntro)
        removeEventListener("mouseup", dragEndIntro)
    } else {
        removeEventListener("touchmove", dragMoveIntro)
        removeEventListener("touchend", dragEndIntro)
    }
}

introducaoStart(0)















function finish(history) {
    let historyFinal = history.length - 1
    let personagemsFoto = history[historyFinal].pessoaImg
    if (personagemsFoto == "") {
        personagemsFoto = "p1.jpeg"
    }
    let html = `
                    <div class="gam-texto">
                        ${history[historyFinal].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemsFoto}')">
                        </div>
                    </div>
                    <div class="gam-nome">
                        </div>
        `
    $(".ga-middle").html(html)

    move.addEventListener("mousedown", dragStartFinish)
}

function dragStartFinish(e) {
    if (sound) {
        soundCartaRetornando.pause()
        soundCartaRetornando.currentTime = 0
        setTimeout(() => {
            soundCartaRetornando.play()
        }, 50)
    }
    if (dispositivo == "desktop") {
        itemX = e.pageX - move.offsetLeft;
        itemY = e.pageY - move.offsetTop;

        addEventListener("mousemove", dragMoveFinish);
        addEventListener("mouseup", dragEndFinish);
    } else {
        itemX = e.targetTouches[0].pageX - move.offsetLeft;
        itemY = e.targetTouches[0].pageY - move.offsetTop;

        addEventListener("touchmove", dragMoveFinish);
        addEventListener("touchend", dragEndFinish);
    }
}

function dragMoveFinish(e) {
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
        directionIntro = "direita"
        $(".gam-pessoa-img").html(
            `
                    <div class="gma-pessoa-texto-direito">
                        Outra História
                    </div>
                `
        )
    } else if (pageX - itemX < 30) {
        directionIntro = "esquerda"
        $(".gam-pessoa-img").html(
            `
                <div class="gma-pessoa-texto-esquerdo">
                    Outra História
                </div>
                `
        )
    } else if (pageX - itemX > 30 && pageX - itemX < 50) {
        directionIntro = ""
        document.querySelector(".gam-pessoa-img").innerHTML = " "
    }
}


function dragEndFinish(aindaTem = true) {
    if (aindaTem) {
        if (directionIntro === "esquerda" || directionIntro === "direita") {
            if (sound) {
                soundCartaJogada.pause()
                soundCartaJogada.currentTime = 0
                setTimeout(() => {
                    soundCartaJogada.play()
                }, 50)
            }

            let historias

            for (let i = 0; i < missions.length; i++) {
                let naoTem = jaJogou.filter(x => x == i)
                if (naoTem == []) {
                    historias = i
                    return
                }
            }

            if (historias)
                if (ja != []) {

                } else {
                    randomHistory
                }
        } else if (directionIntro == "") {
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
    }
    if (dispositivo == "desktop") {
        removeEventListener("mousemove", dragMoveIntro)
        removeEventListener("mouseup", dragEndIntro)
    } else {
        removeEventListener("touchmove", dragMoveIntro)
        removeEventListener("touchend", dragEndIntro)
    }
}


























// Utilitários 


function afetar(pessoa, vida, arma, dinheiro) {
    pessoaV = parseInt(pessoaV) + pessoa
    vidaV = parseInt(vidaV) + vida
    armaV = parseInt(armaV) + arma
    dinheiroV = parseInt(dinheiroV) + dinheiro

    document.querySelector(".pessoa-vida").innerHTML = pessoaV
    document.querySelector(".vida-vida").innerHTML = vidaV
    document.querySelector(".arma-vida").innerHTML = armaV
    document.querySelector(".dinheiro-vida").innerHTML = dinheiroV
    document.querySelector(".ga-middle").innerHTML = " "
}

function morreu() {
    let randomNumber = Math.floor(Math.random() * mortes.length)
    let personagemsFoto = mortes[randomNumber].pessoaImg
    if (personagemsFoto == "") {
        personagemsFoto = "p1.jpeg"
    }
    let html = `
                    <div class="gam-texto">
                        ${mortes[randomNumber].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" onclick="loadingAgain()" style="background-image: url('./personagemsFoto/${personagemsFoto}')">
                        </div>
                    </div>
                    <div class="gam-nome">
                    </div>
        `
    $(".ga-middle").html(html)
}


function loadingAgain(number) {
    $(".loading").css("margin-left", "0")

    document.querySelector(".pessoa-vida").innerHTML = 50
    document.querySelector(".vida-vida").innerHTML = 50
    document.querySelector(".arma-vida").innerHTML = 50
    document.querySelector(".dinheiro-vida").innerHTML = 50

    pessoaV = document.querySelector(".pessoa-vida").innerHTML
    vidaV = document.querySelector(".vida-vida").innerHTML
    armaV = document.querySelector(".arma-vida").innerHTML
    dinheiroV = document.querySelector(".dinheiro-vida").innerHTML

    indiceGame = 0
    setTimeout(() => {
        next(indiceGame)
    }, 500)
}