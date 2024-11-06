let jogador = "X";
let tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let vitoria = false;

// Inicializar banco de dados
if (!localStorage.getItem("jogador")) {
    localStorage.setItem("jogador", jogador);
}
if (!localStorage.getItem("tabuleiro")) {
    localStorage.setItem("tabuleiro", JSON.stringify(tabuleiro));
}
if (!localStorage.getItem("vitoria")) {
    localStorage.setItem("vitoria", vitoria);
}

// Atualizar estado do jogo
function atualizarEstado() {
    jogador = localStorage.getItem("jogador");
    tabuleiro = JSON.parse(localStorage.getItem("tabuleiro"));
    vitoria = localStorage.getItem("vitoria") === "true";
    desenharTabuleiro();
}

// Desenhar tabuleiro
function desenharTabuleiro() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.querySelectorAll(".celula")[i * 3 + j].innerHTML = tabuleiro[i][j];
        }
    }
}

// Jogar
function jogar(linha, coluna) {
    if (vitoria) {
        alert("Jogo finalizado!");
        return;
    }
    if (tabuleiro[linha][coluna] !== "") {
        alert("Célula ocupada!");
        return;
    }
    tabuleiro[linha][coluna] = jogador;
    localStorage.setItem("tabuleiro", JSON.stringify(tabuleiro));
    verificarVitoria();
    jogador = jogador === "X" ? "O" : "X";
    localStorage.setItem("jogador", jogador);
    desenharTabuleiro();
}

// Verificar vitória
function verificarVitoria() {
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] !== "" && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
            vitoria = true;
        }
        if (tabuleiro[0][i] !== "" && tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
            vitoria = true;
        }
    }
    // Verificar diagonal
    if (tabuleiro[0][0] !== "" && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
        vitoria = true;
    }
    if (tabuleiro[0][2] !== "" && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
        vitoria = true;
    }
    
    if (vitoria) {
        localStorage.setItem("vitoria", true);
        alert("Jogo finalizado! O jogador " + jogador + " venceu!");
        jogador = jogador === "X" ? "O" : "X"; // Atualizar jogador após vitória
        localStorage.setItem("jogador", jogador);
    }
}