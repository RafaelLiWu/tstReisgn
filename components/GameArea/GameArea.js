var move = document.getElementById("carta"),
    itemX = 0,
    itemY = 0,
    positionX_inicial = document.getElementById("moveBackground"),
    positionY_inicial = document.getElementById("moveBackground"),
    pessoaV = document.querySelector(".pessoa-vida").innerHTML,
    vidaV = document.querySelector(".vida-vida").innerHTML,
    armaV = document.querySelector(".arma-vida").innerHTML,
    dinheiroV = document.querySelector(".dinheiro-vida").innerHTML,
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
        if(depende){
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
        if(depende){
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
        if(depende){
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
        if(depende){
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


// Em JOGO (Movimentações e Ações)

// function dragStart(e) {
//     if (sound) {
//         soundCartaRetornando.pause()
//         soundCartaRetornando.currentTime = 0
//         setTimeout(() => {
//             soundCartaRetornando.play()
//         }, 50)
//     }
//     if (dispositivo == "desktop") {
//         itemX = e.pageX - move.offsetLeft;
//         itemY = e.pageY - move.offsetTop;

//         addEventListener("mousemove", dragMove);
//         addEventListener("mouseup", dragEnd);
//     } else {
//         itemX = e.targetTouches[0].pageX - move.offsetLeft;
//         itemY = e.targetTouches[0].pageY - move.offsetTop;

//         addEventListener("touchmove", dragMove);
//         addEventListener("touchend", dragEnd);
//     }
// }

// function dragMove(e) {
//     let pageX = (e.pageX != undefined) ? e.pageX : e.targetTouches[0].pageX
//     let pageY = (e.pageY != undefined) ? e.pageY : e.targetTouches[0].pageY
//     move.style.left = (pageX - itemX) + 'px';
//     if ((pageY - itemY) > -43 && (pageY - itemY) < 90) {
//         move.style.top = (pageY - itemY) + 'px';
//     }
//     if (pageX - itemX > 40) {
//         move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
//     } else if (pageX - itemX < 40) {
//         move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
//     }

//     if (pageX - itemX > 50) {
//         direction = "direita"
//         let textoDireito = missions[randomHistory][indiceGame].acoes[1].texto
//         $(".gam-pessoa-img").html(
//             `
//                     <div class="gma-pessoa-texto-direito">
//                         ${textoDireito}
//                     </div>
//                 `
//         )
//     } else if (pageX - itemX < 30) {
//         direction = "esquerda"
//         let textoEsquerdo = missions[randomHistory][indiceGame].acoes[0].texto
//         $(".gam-pessoa-img").html(
//             `
//                 <div class="gma-pessoa-texto-esquerdo">
//                     ${textoEsquerdo}
//                 </div>
//                 `
//         )
//     } else if (pageX - itemX > 30 && pageX - itemX < 50) {
//         direction = ""
//         document.querySelector(".gam-pessoa-img").innerHTML = " "
//     }
// }


// function dragEnd() {
//     if (direction === "esquerda") {
//         afetar(missions[randomHistory][indiceGame].acoes[0].pessoa, missions[randomHistory][indiceGame].acoes[0].vida, missions[randomHistory][indiceGame].acoes[0].arma, missions[randomHistory][indiceGame].acoes[0].dinheiro)
//         if (sound) {
//             soundCartaJogada.pause()
//             soundCartaJogada.currentTime = 0
//             setTimeout(() => {
//                 soundCartaJogada.play()
//             }, 50)
//         }
//         if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
//             let indicePlus = indiceGame + 1
//             if (indicePlus < missions[randomHistory].length - 1) {
//                 indiceGame++
//                 next(indiceGame)
//             } else {
//                 finish(missions[randomHistory])
//             }
//         } else {
//             morreu()
//         }
//     } else if (direction == "direita") {
//         if (sound) {
//             soundCartaJogada.pause()
//             soundCartaJogada.currentTime = 0
//             setTimeout(() => {
//                 soundCartaJogada.play()
//             }, 50)
//         }
//         afetar(missions[randomHistory][indiceGame].acoes[1].pessoa, missions[randomHistory][indiceGame].acoes[1].vida, missions[randomHistory][indiceGame].acoes[1].arma, missions[randomHistory][indiceGame].acoes[1].dinheiro)
//         if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
//             let indicePlus = indiceGame + 1
//             if (indicePlus < missions[randomHistory].length - 1) {
//                 indiceGame++
//                 next(indiceGame)
//             } else {
//                 finish(missions[randomHistory])
//             }
//         } else {
//             morreu()
//         }
//     } else if (direction == "") {
//         if (sound) {
//             soundCartaRetornando.pause()
//             soundCartaRetornando.currentTime = 0
//             setTimeout(() => {
//                 soundCartaRetornando.play()
//             }, 50)
//         }
//         $(move).css("transition", "all cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s")
//         setTimeout(() => {
//             move.style.transform = "rotate(0deg)";
//             $(move).css("left", positionX_inicial)
//             $(move).css("top", positionY_inicial)
//         }, 100)
//         setTimeout(() => {
//             $(move).css("transition", "none")
//         }, 300)
//     }

//     if (dispositivo == "desktop") {
//         removeEventListener("mousemove", dragMove)
//         removeEventListener("mouseup", dragEnd)
//     } else {
//         removeEventListener("touchmove", dragMove)
//         removeEventListener("touchend", dragEnd)
//     }
// }



// function next(i) {
//     let personagemsFoto = missions[randomHistory][i].pessoaImg
//     let textoMission = missions[randomHistory][i].texto
//     if (personagemsFoto == "") {
//         personagemsFoto = "p1.jpeg"
//     }
//     let html = `
//                     <div class="gam-texto">
//                         ${textoMission}
//                     </div>
//                     <div class="gam-pessoa">
//                         <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemsFoto}');">
//                         </div>
//                         <div class="gam-pessoa-img-fundo" id="moveBackground">
//                         </div>
//                     </div>
//                     <div class="gam-nome">
//                         ${missions[randomHistory][i].pessoaNome}
//                     </div>
//         `

//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transform = "rotateY(0deg)";
//     }, 100)

//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transition = "none";
//         if (dispositivo == "desktop") {
//             move.addEventListener("mousedown", dragStart)
//         } else {
//             move.addEventListener("touchstart", dragStart)
//         }
//     }, 1000)

//     $(".ga-middle").html(html)
//     if (textoMission.length > 200) {
//         $(".gam-texto").css("display", "initial")
//     } else {
//         $(".gam-texto").css("display", "flex")
//     }


//     direction = ""

//     move = document.getElementById("carta");

//     positionX_inicial = document.getElementById("moveBackground").offsetLeft
//     positionY_inicial = document.getElementById("moveBackground").offsetTop
// }























// Introdução (Movimentações e Ações)















// function finish(history) {
//     let historyFinal = history.length - 1
//     let personagemsFoto = history[historyFinal].pessoaImg
//     if (personagemsFoto == "") {
//         personagemsFoto = "p1.jpeg"
//     }
//     let html = `
//                     <div class="gam-texto">
//                         ${history[historyFinal].texto}
//                     </div>
//                     <div class="gam-pessoa">
//                         <div class="gam-pessoa-img" id="carta" style="background-image: url('./personagemsFoto/${personagemsFoto}')">
//                         </div>
//                     </div>
//                     <div class="gam-nome">
//                         </div>
//         `
//     $(".ga-middle").html(html)
//     move = document.getElementById("carta")
//     move.addEventListener("mousedown", dragStartFinish)
//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transform = "rotateY(0deg)";
//     }, 100)

//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transition = "none";
//     }, 1000)
// }

// function dragStartFinish(e) {
//     if (sound) {
//         soundCartaRetornando.pause()
//         soundCartaRetornando.currentTime = 0
//         setTimeout(() => {
//             soundCartaRetornando.play()
//         }, 50)
//     }
//     if (dispositivo == "desktop") {
//         itemX = e.pageX - move.offsetLeft;
//         itemY = e.pageY - move.offsetTop;

//         addEventListener("mousemove", dragMoveFinish);
//         addEventListener("mouseup", dragEndFinish);
//     } else {
//         itemX = e.targetTouches[0].pageX - move.offsetLeft;
//         itemY = e.targetTouches[0].pageY - move.offsetTop;

//         addEventListener("touchmove", dragMoveFinish);
//         addEventListener("touchend", dragEndFinish);
//     }
// }

// function dragMoveFinish(e) {
//     let pageX = (e.pageX != undefined) ? e.pageX : e.targetTouches[0].pageX
//     let pageY = (e.pageY != undefined) ? e.pageY : e.targetTouches[0].pageY
//     move.style.left = (pageX - itemX) + 'px';
//     if ((pageY - itemY) > -43 && (pageY - itemY) < 90) {
//         move.style.top = (pageY - itemY) + 'px';
//     }
//     if (pageX - itemX > 40) {
//         move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
//     } else if (pageX - itemX < 40) {
//         move.style.transform = "rotate(" + (((pageX - itemX) - 40) * 0.2) + "deg)"
//     }

//     if (pageX - itemX > 50) {
//         directionIntro = "direita"
//         $(".gam-pessoa-img").html(
//             `
//                     <div class="gma-pessoa-texto-direito">
//                         Outra História
//                     </div>
//                 `
//         )
//     } else if (pageX - itemX < 30) {
//         directionIntro = "esquerda"
//         $(".gam-pessoa-img").html(
//             `
//                 <div class="gma-pessoa-texto-esquerdo">
//                     Outra História
//                 </div>
//                 `
//         )
//     } else if (pageX - itemX > 30 && pageX - itemX < 50) {
//         directionIntro = ""
//         document.querySelector(".gam-pessoa-img").innerHTML = " "
//     }
// }


// function dragEndFinish(aindaTem = true) {
//     if (aindaTem) {
//         if (directionIntro === "esquerda" || directionIntro === "direita") {
//             if (sound) {
//                 soundCartaJogada.pause()
//                 soundCartaJogada.currentTime = 0
//                 setTimeout(() => {
//                     soundCartaJogada.play()
//                 }, 50)
//             }

//             let historias

//             for (let i = 0; i < missions.length; i++) {
//                 let naoTem = jaJogou.filter(x => x == i)
//                 if (naoTem == []) {
//                     historias = i
//                     return
//                 }
//             }

//             if (historias)
//                 if (ja != []) {

//                 } else {
//                     randomHistory
//                 }
//         } else if (directionIntro == "") {
//             if (sound) {
//                 soundCartaRetornando.pause()
//                 soundCartaRetornando.currentTime = 0
//                 setTimeout(() => {
//                     soundCartaRetornando.play()
//                 }, 50)
//             }
//             $(move).css("transition", "all cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s")
//             setTimeout(() => {
//                 move.style.transform = "rotate(0deg)";
//                 $(move).css("left", positionX_inicial)
//                 $(move).css("top", positionY_inicial)
//             }, 100)
//             setTimeout(() => {
//                 $(move).css("transition", "none")
//             }, 300)
//         }
//     }
//     if (dispositivo == "desktop") {
//         removeEventListener("mousemove", dragMoveIntro)
//         removeEventListener("mouseup", dragEndIntro)
//     } else {
//         removeEventListener("touchmove", dragMoveIntro)
//         removeEventListener("touchend", dragEndIntro)
//     }
// }


























// // Utilitários 


// function afetar(pessoa, vida, arma, dinheiro) {
//     pessoaV = parseInt(pessoaV) + pessoa
//     vidaV = parseInt(vidaV) + vida
//     armaV = parseInt(armaV) + arma
//     dinheiroV = parseInt(dinheiroV) + dinheiro

//     document.querySelector(".pessoa-vida").innerHTML = pessoaV
//     document.querySelector(".vida-vida").innerHTML = vidaV
//     document.querySelector(".arma-vida").innerHTML = armaV
//     document.querySelector(".dinheiro-vida").innerHTML = dinheiroV
//     document.querySelector(".ga-middle").innerHTML = " "
// }

// function morreu() {
//     let randomNumber = Math.floor(Math.random() * mortes.length)
//     let personagemsFoto = mortes[randomNumber].pessoaImg
//     if (personagemsFoto == "") {
//         personagemsFoto = "p1.jpeg"
//     }
//     let html = `
//                     <div class="gam-texto">
//                         ${mortes[randomNumber].texto}
//                     </div>
//                     <div class="gam-pessoa">
//                         <div class="gam-pessoa-img" id="carta" onclick="loadingAgain()" style="background-image: url('./personagemsFoto/${personagemsFoto}')">
//                         </div>
//                     </div>
//                     <div class="gam-nome">
//                     </div>
//         `
//     $(".ga-middle").html(html)
//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transform = "rotateY(0deg)";
//     }, 100)

//     setTimeout(() => {
//         document.querySelector(".gam-pessoa-img").style.transition = "none";
//     }, 1000)
// }


// function loadingAgain(number) {
//     $(".loading").css("margin-left", "0")

//     document.querySelector(".pessoa-vida").innerHTML = 50
//     document.querySelector(".vida-vida").innerHTML = 50
//     document.querySelector(".arma-vida").innerHTML = 50
//     document.querySelector(".dinheiro-vida").innerHTML = 50

//     pessoaV = document.querySelector(".pessoa-vida").innerHTML
//     vidaV = document.querySelector(".vida-vida").innerHTML
//     armaV = document.querySelector(".arma-vida").innerHTML
//     dinheiroV = document.querySelector(".dinheiro-vida").innerHTML

//     indiceGame = 0
//     setTimeout(() => {
//         next(indiceGame)
//     }, 500)
// }















