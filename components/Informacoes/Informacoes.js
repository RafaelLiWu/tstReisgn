$(".Menu").click(() => {
    $(".informacoes").css("display", "flex")
    setTimeout(() => {
        $(".informacoes-area").css('margin-bottom', '0')
        $(".informacoes-fundo").css("opacity", '1')
    }, 50)
})

$(".informacoes-area-cima-sair").click(() => {
    $(".informacoes-area").css('margin-bottom', '200vh')
    $(".informacoes-fundo").css("opacity", '0')
    setTimeout(() => {
        $(".informacoes").css("display", "none")
    }, 550)
})