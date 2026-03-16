const botoes = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo');
const posicoesScroll = {};

function salvarScroll(id) {
    posicoesScroll[id] = window.scrollY;
}

function mostrarAba(id) {
    const abaAtiva = document.querySelector('.conteudo.active');
    if (abaAtiva) {
        salvarScroll(abaAtiva.id);
    }

    conteudos.forEach(c => c.classList.remove('active'));
    botoes.forEach(b => b.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    document.querySelector(`.aba[data-alvo="${id}"]`).classList.add('active');

    setTimeout(() => {
        window.scrollTo(0, posicoesScroll[id] || 0);
    }, 10);
}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        mostrarAba(botao.getAttribute('data-alvo'));
    });
});

window.onload = function () {
    window.scrollTo(0, 0);
    mostrarAba('inicio');
};

const perguntas = document.querySelectorAll('.card-pergunta');

perguntas.forEach(pergunta => {
    const correta = pergunta.dataset.correta;
    const opcoes = pergunta.querySelectorAll('input[type="radio"]');

    opcoes.forEach(opcao => {
        opcao.addEventListener('change', () => {
            pergunta.querySelectorAll('label').forEach(l => {
                l.classList.remove('correta', 'errada');
            });

            const selecionada = opcao.value;
            const label = opcao.parentElement;

            if (selecionada === correta) {
                label.classList.add('correta');
            } else {
                label.classList.add('errada');
            }

            pergunta.classList.add('respondida');
        });
    });
});

const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTopo.classList.add('mostrar');
    } else {
        btnTopo.classList.remove('mostrar');
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});