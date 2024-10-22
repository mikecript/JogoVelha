const dt = new Date().toLocaleString();
let jogadas = 0;

document.getElementById("data").innerHTML = dt;

function FuncaoAviso() {
    alert('Professor nos dá FÉRIAS!!!');
}

let tabuleiro = ["", "", "", "", "", "", "", "", "", ""];
let jogoEncerrado = false;

function RoboJoga() {
    if (jogadas < 9) {
        let jogada = bloquearOuVencer("O") || bloquearOuVencer("X") || JogadaAleatoria();
        if (jogada !== null) {
            document.getElementById(jogada).innerHTML = "O";
            tabuleiro[jogada] = "O";
            jogadas++;
        }
    }
}

function jogar(bot) {
    if (!jogoEncerrado) {
        if (tabuleiro[bot] === "") {

            document.getElementById(bot).innerHTML = "X";
            tabuleiro[bot] = "X";
            jogadas++;
            
            if (VerificaVitoria("X")) {
                document.getElementById("data").innerHTML = "Você Ganhou!!";
                jogoEncerrado = true;
                return;
            } else if (jogadas >= 9) {
                document.getElementById("data").innerHTML = "O jogo Empatou!";
                alert("O jogo empatou!");
                jogoEncerrado = true;
                return;
            }

            RoboJoga();

            if (VerificaVitoria("O")) {
                document.getElementById("data").innerHTML = "Você Perdeu!!";
                jogoEncerrado = true;
            } else if (jogadas >= 9) {
                document.getElementById("data").innerHTML = "O jogo Empatou!";
                alert("O jogo empatou!");
                jogoEncerrado = true;
            }
        } else {
            alert("Escolha outra posição!");
        }
    } else {
        alert("O jogo já acabou!");
    }
}

function VerificaVitoria(jogador) {
    const condicoesVitoria = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    return condicoesVitoria.some(combinacao => 
        combinacao.every(index => tabuleiro[index] === jogador)
    );
}

function posicoesVazias() {
    return tabuleiro.map((val, index) => val === "" ? index : null).filter(val => val !== null);
}


function JogadaAleatoria() {
    let vazios = posicoesVazias();
    if (vazios.length > 0) {
        let escolha = vazios[Math.floor(Math.random() * vazios.length)];
        return escolha;
    }
    return null;
}

function bloquearOuVencer(jogador) {
    const condicoesVitoria = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (let condicao of condicoesVitoria) {
        let [a, b, c] = condicao;
        if (tabuleiro[a] === jogador && tabuleiro[b] === jogador && tabuleiro[c] === "") {
            return c;
        }
        if (tabuleiro[a] === jogador && tabuleiro[c] === jogador && tabuleiro[b] === "") {
            return b;
        }
        if (tabuleiro[b] === jogador && tabuleiro[c] === jogador && tabuleiro[a] === "") {
            return a;
        }
    }
    return null;
}
