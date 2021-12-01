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
    dinheiroV = document.querySelector(".dinheiro-vida").innerHTML;

if (window.innerWidth > 600) {
    function dragStart(e) { // Desktop
        itemX = e.pageX - move.offsetLeft;
        itemY = e.pageY - move.offsetTop;

        addEventListener("mousemove", dragMove);
        addEventListener("mouseup", dragEnd);
    }

    function dragMove(e) {
        move.style.left = (e.pageX - itemX) + 'px';
        if ((e.pageY - itemY) > -43 && (e.pageY - itemY) < 90) {
            move.style.top = (e.pageY - itemY) + 'px';
        }
        if (e.pageX - itemX > 40) {
            move.style.transform = "rotate(" + (((e.pageX - itemX) - 40) * 0.2) + "deg)"
        } else if (e.pageX - itemX < 40) {
            move.style.transform = "rotate(" + (((e.pageX - itemX) - 40) * 0.2) + "deg)"
        }

        if (e.pageX - itemX > 50) {
            direction = "direita"
            let textoDireito = missions[indiceGame].acoes[1].texto
            $(".gam-pessoa-img").html(
                `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
            )
        } else if (e.pageX - itemX < 30) {
            direction = "esquerda"
            let textoEsquerdo = missions[indiceGame].acoes[0].texto
            $(".gam-pessoa-img").html(
                `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerdo}
                </div>
                `
            )
        } else if (e.pageX - itemX > 30 && e.pageX - itemX < 50) {
            direction = ""
            document.querySelector(".gam-pessoa-img").innerHTML = " "
        }
    }

    function dragEnd() {
        if (direction === "esquerda") {
            afetar(missions[indiceGame].acoes[0].pessoa, missions[indiceGame].acoes[0].vida, missions[indiceGame].acoes[0].arma, missions[indiceGame].acoes[0].dinheiro)
            if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
                let indicePlus = indiceGame + 1
                if (indicePlus < missions.length) {
                    indiceGame++
                    next(indiceGame)
                } else {
                    finish()
                }
            } else {
                morreu()
            }
        } else if (direction == "direita") {
            afetar(missions[indiceGame].acoes[1].pessoa, missions[indiceGame].acoes[1].vida, missions[indiceGame].acoes[1].arma, missions[indiceGame].acoes[1].dinheiro)
            if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
                let indicePlus = indiceGame + 1
                if (indicePlus < missions.length) {
                    indiceGame++
                    next(indiceGame)
                } else {
                    finish()
                }
            } else {
                morreu()
            }
        } else if (direction == "") {
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
        removeEventListener("mousemove", dragMove)
        removeEventListener("mouseup", dragEnd)
    }


    function next(i) {
        let personagemsFoto = missions[i].pessoaImg
        let textoMission = missions[i].texto
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
                        ${missions[i].pessoaNome}
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

        move.addEventListener("mousedown", dragStart)
    }










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

        move.addEventListener("mousedown", dragStartIntro)
    }



    function dragStartIntro(e) {
        itemX = e.pageX - move.offsetLeft;
        itemY = e.pageY - move.offsetTop;

        addEventListener("mousemove", dragMoveIntro);
        addEventListener("mouseup", dragEndIntro);
    }



    function dragMoveIntro(e) {
        move.style.left = (e.pageX - itemX) + 'px';
        if ((e.pageY - itemY) > -43 && (e.pageY - itemY) < 90) {
            move.style.top = (e.pageY - itemY) + 'px';
        }
        if (e.pageX - itemX > 40) {
            move.style.transform = "rotate(" + (((e.pageX - itemX) - 40) * 0.2) + "deg)"
        } else if (e.pageX - itemX < 40) {
            move.style.transform = "rotate(" + (((e.pageX - itemX) - 40) * 0.2) + "deg)"
        }

        if (e.pageX - itemX > 50) {
            directionIntro = "direita"
            let textoDireito = introducao[indiceIntro].acoes[1].texto
            $(".gam-pessoa-img").html(
                `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
            )
        } else if (e.pageX - itemX < 30) {
            directionIntro = "esquerda"
            let textoEsquerdo = introducao[indiceIntro].acoes[0].texto
            $(".gam-pessoa-img").html(
                `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerdo}
                </div>
                `
            )
        } else if (e.pageX - itemX > 30 && e.pageX - itemX < 50) {
            directionIntro = ""
            document.querySelector(".gam-pessoa-img").innerHTML = " "
        }
    }

    function dragEndIntro() {
        if (directionIntro === "esquerda") {
            next(indiceGame)
        } else if (directionIntro == "direita") {
            if (indiceIntro < introducao.length - 1) {
                indiceIntro++
                introducaoStart(indiceIntro)
            } else {
                next(indiceGame)
            }
        } else if (directionIntro == "") {
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
        removeEventListener("mousemove", dragMoveIntro)
        removeEventListener("mouseup", dragEndIntro)
    }

    introducaoStart(0)



} else { // Mobile
    move.addEventListener("touchstart", dragStart)

    function dragStart(e) {
        itemX = e.targetTouches[0].pageX - move.offsetLeft;
        itemY = e.targetTouches[0].pageY - move.offsetTop;

        addEventListener("touchmove", dragMove);
        addEventListener("touchend", dragEnd);
    }

    function dragMove(e) {
        move.style.left = (e.targetTouches[0].pageX - itemX) + 'px';

        if ((e.targetTouches[0].pageY - itemY) > -43 && (e.targetTouches[0].pageY - itemY) < 90) {
            move.style.top = (e.targetTouches[0].pageY - itemY) + 'px';
        }
        if (e.targetTouches[0].pageX - itemX > 40) {
            move.style.transform = "rotate(" + (((e.targetTouches[0].pageX - itemX) - 40) * 0.2) + "deg)"
        } else if (e.targetTouches[0].pageX - itemX < 40) {
            move.style.transform = "rotate(" + (((e.targetTouches[0].pageX - itemX) - 40) * 0.2) + "deg)"
        }

        if (e.targetTouches[0].pageX - itemX > 50) {
            direction = "direita"
            let textoDireito = missions[indiceGame].acoes[1].texto
            $(".gam-pessoa-img").html(
                `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
            )
        } else if (e.targetTouches[0].pageX - itemX < 30) {
            direction = "esquerda"
            let textoEsquerdo = missions[indiceGame].acoes[0].texto
            $(".gam-pessoa-img").html(
                `
                    <div class="gma-pessoa-texto-esquerdo">
                        ${textoEsquerdo}
                    </div>
                `

            )
        } else if (e.targetTouches[0].pageX - itemX > 30 && e.targetTouches[0].pageX - itemX < 50) {
            direction = ""
            document.querySelector(".gam-pessoa-img").innerHTML = " "
        }

    }



    function dragEnd() {
        if (direction === "esquerda") {
            afetar(missions[indiceGame].acoes[0].pessoa, missions[indiceGame].acoes[0].vida, missions[indiceGame].acoes[0].arma, missions[indiceGame].acoes[0].dinheiro)
            if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
                let indicePlus = indiceGame + 1
                if (indicePlus < missions.length) {
                    indiceGame++
                    next(indiceGame)
                } else {
                    finish()
                }
            } else {
                morreu()
            }
        } else if (direction == "direita") {
            afetar(missions[indiceGame].acoes[1].pessoa, missions[indiceGame].acoes[1].vida, missions[indiceGame].acoes[1].arma, missions[indiceGame].acoes[1].dinheiro)
            if (pessoaV > 0 && vidaV > 0 && armaV > 0 && dinheiroV > 0) {
                let indicePlus = indiceGame + 1
                if (indicePlus < missions.length) {
                    indiceGame++
                    next(indiceGame)
                } else {
                    finish()
                }
            } else {
                morreu()
            }
        } else if (direction == "") {
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

        removeEventListener("touchmove", dragMove)
        removeEventListener("touchend", dragEnd)
    }

    function next(i) {
        let personagemsFoto = missions[i].pessoaImg
        let textoMission = missions[i].texto
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
                        ${missions[i].pessoaNome}
                    </div>
        `

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

        move.addEventListener("touchstart", dragStart)
    }



















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

        move.addEventListener("touchstart", dragStartIntro)
    }



    function dragStartIntro(e) {
        itemX = e.targetTouches[0].pageX - move.offsetLeft;
        itemY = e.targetTouches[0].pageY - move.offsetTop;

        addEventListener("touchmove", dragMoveIntro);
        addEventListener("touchend", dragEndIntro);
    }



    function dragMoveIntro(e) {
        move.style.left = (e.targetTouches[0].pageX - itemX) + 'px';
        if ((e.targetTouches[0].pageY - itemY) > -43 && (e.targetTouches[0].pageY - itemY) < 90) {
            move.style.top = (e.targetTouches[0].pageY - itemY) + 'px';
        }
        if (e.targetTouches[0].pageX - itemX > 40) {
            move.style.transform = "rotate(" + (((e.targetTouches[0].pageX - itemX) - 40) * 0.2) + "deg)"
        } else if (e.targetTouches[0].pageX - itemX < 40) {
            move.style.transform = "rotate(" + (((e.targetTouches[0].pageX - itemX) - 40) * 0.2) + "deg)"
        }

        if (e.targetTouches[0].pageX - itemX > 50) {
            directionIntro = "direita"
            let textoDireito = introducao[indiceIntro].acoes[1].texto
            $(".gam-pessoa-img").html(
                `
                    <div class="gma-pessoa-texto-direito">
                        ${textoDireito}
                    </div>
                `
            )
        } else if (e.targetTouches[0].pageX - itemX < 30) {
            directionIntro = "esquerda"
            let textoEsquerdo = introducao[indiceIntro].acoes[0].texto
            $(".gam-pessoa-img").html(
                `
                <div class="gma-pessoa-texto-esquerdo">
                    ${textoEsquerdo}
                </div>
                `
            )
        } else if (e.targetTouches[0].pageX - itemX > 30 && e.targetTouches[0].pageX - itemX < 50) {
            directionIntro = ""
            document.querySelector(".gam-pessoa-img").innerHTML = " "
        }
    }

    function dragEndIntro() {
        if (directionIntro === "esquerda") {
            next(indiceGame)
        } else if (directionIntro == "direita") {
            if (indiceIntro < introducao.length - 1) {
                indiceIntro++
                introducaoStart(indiceIntro)
            } else {
                next(indiceGame)
            }
        } else if (directionIntro == "") {
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
        removeEventListener("touchmove", dragMoveIntro)
        removeEventListener("touchend", dragEndIntro)
    }

    introducaoStart(0)



}

// Funções tanto para mobile e desktop

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

function finish() {
    let randomNumber = Math.floor(Math.random() * finais.length)
    let personagemsFoto = finais[randomNumber].pessoaImg
    if (personagemsFoto == "") {
        personagemsFoto = "p1.jpeg"
    }
    let html = `
                    <div class="gam-texto">
                        ${finais[randomNumber].texto}
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


function loadingAgain() {
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