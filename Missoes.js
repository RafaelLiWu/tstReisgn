const introducao = [
    {
        texto: "Olá jogador, deseja começar o tutorial?",
        pessoaImg: "",
        pessoaNome: "Estágiario",
        acoes: [
            {
                texto: "Não obrigado."
            },
            {
                texto: "Claro"
            }
        ]
    },
    {
        texto: ".. você apenas joga e faz isso faz aquilo e mais aquilo ali e tals",
        pessoaImg: "",
        pessoaNome: "Mulher da intro",
        acoes: [
            {
                texto: "Atah já entendi"
            },
            {
                texto: "Continua"
            }
        ]
    },
    {
        texto: "Tu já entendeu, para de se fingir de bobo",
        pessoaImg: "",
        pessoaNome: "Mulher da intro irritada",
        acoes: [
            {
                texto: "Beleza"
            },
            {
                texto: "Beleza"
            }
        ]
    }
]











const missions = [



    [
        {
            texto: "As tropas então avançando na muralha, e os nossos soldados estão com fome.",
            pessoaImg: "p1.jpeg",
            pessoaNome: "Embaixador Ross",
            acoes: [
                {
                    texto: "Vamos sair..",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Defendam!",
                    pessoa: -8,
                    vida: -41,
                    arma: -24,
                    dinheiro: 12
                }
            ]
        },
        {
            texto: "As coisas estão complicadas, nós iremos morrer, vamos começar a matar tudo mundo.",
            pessoaImg: "",
            pessoaNome: "Informante",
            acoes: [
                {
                    texto: "Tá maluco?",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Então ta esperando oque?",
                    pessoa: -50,
                    vida: -50,
                    arma: -50,
                    dinheiro: -50
                }
            ]
        },
        {
            texto: "Está anoite, e é perfeito para uma invasâo, vamos invadir eles!",
            pessoaImg: "",
            pessoaNome: "Carinha invasor",
            acoes: [
                {
                    texto: "Vou na frente",
                    pessoa: 3,
                    vida: 2,
                    arma: 10,
                    dinheiro: 20
                },
                {
                    texto: "Vai sozinho",
                    pessoa: -10,
                    vida: 1,
                    arma: -10,
                    dinheiro: -12
                }
            ]
        },
        {
            texto: "Essa é a final e você passou, parabens!!",
            pessoaImg: "",
            pessoaNome: "Servidor!"
        }
    ],








    [
        {
            texto: "Versão 2 As tropas então avançando na muralha, e os nossos soldados estão com fome.",
            pessoaImg: "p1.jpeg",
            pessoaNome: "Embaixador Ross",
            acoes: [
                {
                    texto: "Vamos sair..",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Defendam!",
                    pessoa: -8,
                    vida: -41,
                    arma: -24,
                    dinheiro: 12
                }
            ]
        },
        {
            texto: "As coisas estão complicadas, nós iremos morrer, vamos começar a matar tudo mundo.",
            pessoaImg: "",
            pessoaNome: "Informante",
            acoes: [
                {
                    texto: "Tá maluco?",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Então ta esperando oque?",
                    pessoa: -50,
                    vida: -50,
                    arma: -50,
                    dinheiro: -50
                }
            ]
        },
        {
            texto: "Está anoite, e é perfeito para uma invasâo, vamos invadir eles!",
            pessoaImg: "",
            pessoaNome: "Carinha invasor",
            acoes: [
                {
                    texto: "Vou na frente",
                    pessoa: 3,
                    vida: 2,
                    arma: 10,
                    dinheiro: 20
                },
                {
                    texto: "Vai sozinho",
                    pessoa: -10,
                    vida: 1,
                    arma: -10,
                    dinheiro: -12
                }
            ]
        },
        {
            texto: "Essa é a final e você passou, parabens!!",
            pessoaImg: "",
            pessoaNome: "Servidor!"
        }
    ],



















    [
        {
            texto: "Versão 2 As tropas então avançando na muralha, e os nossos soldados estão com fome.",
            pessoaImg: "p1.jpeg",
            pessoaNome: "Embaixador Ross",
            acoes: [
                {
                    texto: "Vamos sair..",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Defendam!",
                    pessoa: -8,
                    vida: -41,
                    arma: -24,
                    dinheiro: 12
                }
            ]
        },
        {
            texto: "As coisas estão complicadas, nós iremos morrer, vamos começar a matar tudo mundo.",
            pessoaImg: "",
            pessoaNome: "Informante",
            acoes: [
                {
                    texto: "Tá maluco?",
                    pessoa: 10,
                    vida: 13,
                    arma: -10,
                    dinheiro: 0
                },
                {
                    texto: "Então ta esperando oque?",
                    pessoa: -50,
                    vida: -50,
                    arma: -50,
                    dinheiro: -50
                }
            ]
        },
        {
            texto: "Está anoite, e é perfeito para uma invasâo, vamos invadir eles!",
            pessoaImg: "",
            pessoaNome: "Carinha invasor",
            acoes: [
                {
                    texto: "Vou na frente",
                    pessoa: 3,
                    vida: 2,
                    arma: 10,
                    dinheiro: 20
                },
                {
                    texto: "Vai sozinho",
                    pessoa: -10,
                    vida: 1,
                    arma: -10,
                    dinheiro: -12
                }
            ]
        },
        {
            texto: "Essa é a final e você passou, parabens!!",
            pessoaImg: "",
            pessoaNome: "Servidor!"
        }
    ]







]

const mortes = [
    {
        texto: "Você foi derrotado!!",
        pessoaImg: ""
    }
]