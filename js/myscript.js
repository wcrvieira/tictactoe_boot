// Configurando o monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function() {

    // Definição das variáveis que vão receber os atributos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
    const resetBtn = document.getElementById('reset-button');

    let jogadorAtual = 'Hulk';
    let jogoAtivo = true;

    // Criação e inicialização do array do tabuleiro
    let tabuleiro = ['','','','','', '','', '', ''];

    // Definição das possibilidades de jogadas
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Criaçaõ da função clica nas células para preencher o array
    function clica(event) {
        const celula = event.target;
        const indice = Array.from(celulas).indexOf(celula);

       // Verifica se as células estão vazias e, se tiver, encerra a função
       if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
       }

       // Caso contrário, armazena o jogador em cada célula
       tabuleiro[indice] = jogadorAtual;
       celula.appendChild(carregaImagem(jogadorAtual));

       // Conforme as verificações das jogadas, envia as mensagens específicas
       if (verifica(jogadorAtual)) {
            jogoAtivo = false;
            status.textContent = `O jogador ${jogadorAtual} venceu!`;
       } else if (tabuleiro.includes('')) {
            jogadorAtual = jogadorAtual === 'Hulk' ? 'IronMan' : 'Hulk';
            status.textContent = `É a vez do jogador ${jogadorAtual}`;
       } else {
            jogoAtivo = false;
            status.textContent = 'Empate!';
       }
    }

    // Função que testa cada jogada, percorrendo o Array
    // E comparando com o jogador atual
    // Quando encontra a situação, envia a mensagem adequada
    function verifica(jogador) {
        for (const jogadas of possibilidades) {
            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }
        return false;
    }

    // Função para carregar a imagem dos personagens em cada célula
    function carregaImagem(jogador) {
        const imagem = new Image();

        // Condicional com operador ternário
        // Verifica qual o jogador ativo e preenche com a imagem definida
        imagem.src = jogador === 'Hulk' ? 'images/hulk.png' : 'images/ironman.png';
        imagem.alt = jogador;
        return imagem;
    }

    // Função para zerar o jogo, atribuindo espaços no Array
    function resetJogo() {
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        jogadorAtual = 'Hulk';

        // Laço que percorre o Array, limpando o conteúdo
        // Apaga cada filho do Array, um a um
        celulas.forEach((celula) => {
            celula.textContent = '';
            while (celula.firstChild) {
                celula.removeChild(celula.firstChild);
            }
        })
    }

    // Dispara o evento Click do mouse, chamando a função clica
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    // Dispara o evento click do mouse, chamando a função resetJogo
    resetBtn.addEventListener('click', resetJogo);

})