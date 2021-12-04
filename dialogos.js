let Inicio = [
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Tancredo, cavalga sem rumo após ser traido pela sua amada. Após um tempo cavalgando, ele cai no chão prestes a morrer, quando Túlio um escravo leva para a casa de Luísa B.",
        direita: ``,
        esquerda: ``
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Tancredo se recupera a conciência e ao encontrar Úrsula ambos se apaixonam e prometem se casar, porém após ele se recuperar totalmente ele teria que sair, mas antes ele paga a alforria de Tulio, que decide segui-lo",
        direita:``,
        esquerda:``
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Fernando, tio de Úrsula, um homem controlador que contém odio contra a familia de Luiza B, encontra Úrsula e decide que ela seria a sua esposa",
        direita:``,
        esquerda:``
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Luiza B depois de tempos enfermo morre, e quando Úrsula estava no cemiterio sozinha, Tancredo e Túlio a encontram no regresso de sua viagem. E após um tempo a promessa iria acontecer",
        direita: ``,
        esquerda: ``
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "O Casamento, e na manhã seguinte...",
        direita: ``,
        esquerda: ``
    },
    {
        personagem: "Túlio",
        personagemImagem: "",
        texto: `Hoje o dia tá tão bonito - Falo abrindo a janela, e vendo o horizonte"`,
        direita: ``,
        esquerda: ``,
    },
    {
        personagem: "Túlio",
        personagemImagem: "",
        texto: `Bom dia Tancredo!`,
        direita: `Tudo preparado para hoje à noite?`,
        esquerda: `Ansioso por hoje?`,
        rota: 0
    }
]

let dependeHistoria = [
    {
        id: 0,
        rota: 0,
        personagem: "Tancredo",
        personagemImagem: "",
        texto: `Bom dia Túlio! Meu coração arde de ansiedade, porém espero que tudo dê certo!`,
        direita: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
        esquerda: `É claro que vai, você ama Úrsula`,
        searchRota: 1 
    },
    {
        id: 1,
        rota: 0,
        personagem: "Tancredo",
        personagemImagem: "",
        texto: `Bom dia Túlio! Espero que sim, todos estão fazendo um ótimo trabalho com a cerimônia.`,
        direita: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
        esquerda: `É claro que vai, você ama Úrsula`,
        searchRota: 1 
    },
    {
        id: 2,
        rota: 1,
        personagem: "Tancredo",
        personagemImagem: "",
        texto: `Nada de errado irá acontecer.`,
        direita: `Vocês irão formar uma bela família, amigo`,
        esquerda: `Vocês irão formar uma bela família, amigo`,
    },
    {
        id: 3,
        rota: 1,
        personagem: "Tancredo",
        personagemImagem: "",
        texto: `Pare de falar essas coisas ruins Túlio! Nada de errado irá acontecer.`,
        direita: `Nada de errado irá acontecer.`,
        esquerda: `Nada de errado irá acontecer.`
    }
]
