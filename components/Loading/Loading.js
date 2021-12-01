function loading() {
    $(".loading").css("margin-left", "375px")
    setTimeout(()=>{
        $(".intro-inside").css("opacity", "1")
        setTimeout(()=>{
            $(".intro-inside").css("opacity", "0")
            setTimeout(()=>{
                $(".intro-creditos").css("margin-left", "375px")
            }, 200)
        },3500)
    },550)
}

$(".loading").click(loading)