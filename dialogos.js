let Inicio = [
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Tancredo, cavalga sem rumo após ser traido pela sua amada. Após um tempo cavalgando, ele cai no chão prestes a morrer, quando Túlio um escravo leva para a casa de Luísa B.",
        direita: `...`,
        esquerda: `...`
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Tancredo se recupera a conciência e ao encontrar Úrsula ambos se apaixonam e prometem se casar, porém após ele se recuperar totalmente ele teria que sair, mas antes ele paga a alforria de Tulio, que decide segui-lo",
        direita:`...`,
        esquerda:`...`
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Fernando, tio de Úrsula, um homem controlador que contém odio contra a familia de Luiza B, encontra Úrsula e decide que ela seria a sua esposa",
        direita:`...`,
        esquerda:`...`
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "Luiza B depois de tempos enfermo morre, e quando Úrsula estava no cemiterio sozinha, Tancredo e Túlio a encontram no regresso de sua viagem. E após um tempo a promessa iria acontecer",
        direita: `...`,
        esquerda: `...`
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: "O Casamento, e na manhã seguinte...",
        direita: `...`,
        esquerda: `...`
    },
    {
        personagem: "Túlio",
        personagemImagem: "",
        texto: `Hoje o dia tá tão bonito - Falo abrindo a janela, e vendo o horizonte"`,
        direita: `...`,
        esquerda: `...`,
    },
    {
        personagem: "Túlio",
        personagemImagem: "",
        texto: `Bom dia Tancredo!`,
        direita: `Tudo preparado para hoje à noite?`,
        esquerda: `Ansioso por hoje?`,
        rota: 0
    },
    {
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Mas amigo, preciso decidir o que usar. [Tancredo fala pegando duas roupas]`,
        direita: `Imagino que o terno branco seja melhor para essa situação`,
        esquerda: `Claramente o terno preto vai ser melhor.`
    },
    {
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `A sua palavra vale de muito para mim, vou com esse terno mesmo! Mas e você, já sabe o que usar?`,
        direita: `Acho que irei com aquele terno que você me deu`,
        esquerda: `Acho que irei com minha roupa normal, não é muito o que um escravo negro pode escolher!`,
        rota: 2
    },
    {
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Então estamos prontos, acho que já vou indo para arrumar minhas coisas`,
        direita: `Tudo bem amigo, pode ir. Preciso resolver algumas coisas da casa antes, mas prometo não atrasar!`,
        esquerda: `Tudo bem amigo, pode ir. Preciso resolver algumas coisas da casa antes, mas prometo não atrasar!`,
    },
    {
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Tenho certeza de que o casamento será um sucesso, o que será que eu faço primeiro agora? [Falo enquanto vou tomando meu café]`,
        direita: `Vou cortar a grama.`,
        esquerda: `Vou ver os animais.`
    },
    {
        personagem: "Narrador",
        personagemImagem: "",
        texto: `Opa que bom ver você aqui, o jogo ainda não acabou, porém a história parou.`,
        direita: `Não me solta na direita`,
        esquerda: `Não me solta na esquerda`
    }
]

let dependeHistoria = [
    {
        id: 0,
        rota: 0,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Bom dia Túlio! Meu coração arde de ansiedade, porém espero que tudo dê certo!`,
        direita: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
        esquerda: `É claro que vai, você ama Úrsula`,
        searchRota: 1 
    },
    {
        id: 1,
        rota: 0,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Bom dia Túlio! Espero que sim, todos estão fazendo um ótimo trabalho com a cerimônia.`,
        direita: `Espero que dê tudo certo sim, mas tenho um mal pressentimento`,
        esquerda: `É claro que vai, você ama Úrsula`,
        searchRota: 1 
    },
    {
        id: 2,
        rota: 1,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Realmente amo, não sei como viveria sem ela`,
        direita: `Vocês irão formar uma bela família, amigo`,
        esquerda: `Vocês irão formar uma bela família, amigo`,
    },
    {
        id: 3,
        rota: 1,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Pare de falar essas coisas ruins Túlio! Nada de errado irá acontecer.`,
        direita: `Tens de estar certo, melhor eu parar de falar isso...`,   
        esquerda: `Tens de estar certo, melhor eu parar de falar isso...`
    },
    {
        id: 4,
        rota: 2,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Pare com isso amigo, é claro que você deve usar o que quer!"`,
        direita: `Então tudo bem, acho que irei com aquele terno que você me deu.`,   
        esquerda: `Então tudo bem, acho que irei com aquele terno que você me deu.`
    },
    {
        id: 5,
        rota: 2,
        personagem: "Tâncredo",
        personagemImagem: "",
        texto: `Ótima escolha! Você fica ótimo usando ele.`,
        direita: `Obrigado amigo, é claro que eu fico bem com algo que você me deu`,   
        esquerda: `Obrigado amigo, é claro que eu fico bem com algo que você me deu`
    }
]
