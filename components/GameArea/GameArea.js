var move = document.getElementById("carta"),
    indiceGame = 0,
    itemX = 0,
    itemY = 0,
    transitionX = 0,
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

        if (e.pageX - itemX > 45) {
            direction = "direita"
            let textoDireito = missions[indiceGame].acoes[1].texto
            $(".gam-pessoa-img").html(textoDireito)
        } else if (e.pageX - itemX < 35) {
            direction = "esquerda"
            let textoEsquerdo = missions[indiceGame].acoes[0].texto
            $(".gam-pessoa-img").html(textoEsquerdo)
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
        }
        removeEventListener("mousemove", dragMove)
        removeEventListener("mouseup", dragEnd)
    }


    function next(i) {
        let html = `
                    <div class="gam-texto">
                        ${missions[i].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta">
                        </div>
                    </div>
                    <div class="gam-nome">
                        ${missions[i].pessoaNome}
                    </div>
        `

        $(".ga-middle").html(html)

        direction = ""

        move = document.getElementById("carta");

        move.addEventListener("mousedown", dragStart)
    }


    next(indiceGame)




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

        if (e.targetTouches[0].pageX - itemX > 45) {
            direction = "direita"
            let textoDireito = missions[indiceGame].acoes[1].texto
            $(".gam-pessoa-img").html(textoDireito)
        } else if (e.targetTouches[0].pageX - itemX < 35) {
            direction = "esquerda"
            let textoEsquerdo = missions[indiceGame].acoes[0].texto
            $(".gam-pessoa-img").html(textoEsquerdo)
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
        }
        removeEventListener("touchmove", dragMove)
        removeEventListener("touchend", dragEnd)
    }

    function next(i) {
        let html = `
                    <div class="gam-texto">
                        ${missions[i].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta">
                        </div>
                    </div>
                    <div class="gam-nome">
                        ${missions[i].pessoaNome}
                    </div>
        `

        $(".ga-middle").html(html)

        direction = ""

        move = document.getElementById("carta");

        move.addEventListener("touchstart", dragStart)
    }


    next(indiceGame)


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
    let randomNumber = Math.floor(Math.random() * finais.length)
    let html = `
                    <div class="gam-texto">
                        ${mortes[randomNumber].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" onclick="loadingAgain()">
                        </div>
                    </div>
                    <div class="gam-nome">
                    </div>
        `
    $(".ga-middle").html(html)
}

function finish() {
    let randomNumber = Math.floor(Math.random() * finais.length)
    let html = `
                    <div class="gam-texto">
                        ${finais[randomNumber].texto}
                    </div>
                    <div class="gam-pessoa">
                        <div class="gam-pessoa-img" id="carta" onclick="loadingAgain()">
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