// Importar sonidos
const diceRollSound = new Audio('./assets/sounds/dice-throw_01.mp3');
const diceOrderSound = new Audio('./assets/sounds/dice-throw_02.mp3');

// Referencias al DOM
const colorSelection = document.querySelector("#color-selection");
const rollDiceButton = document.querySelector("#roll-dice");
const resetButton = document.querySelector("#reset");
const tieBreakButton = document.querySelector("#tie-break");
const dadosContainer = document.querySelector("#dados-container");

let jugadores = [];

// Función para inicializar dados
function inicializarDados() {
    dadosContainer.innerHTML = "";
    jugadores.forEach(jugador => {
        const dado = document.createElement("div");
        dado.className = "dice";
        dado.style.backgroundColor = jugador.color;
        dado.dataset.color = jugador.color;
        dadosContainer.appendChild(dado);
    });
}

// Función para tirar los dados
function tirarDados() {
    diceRollSound.play();
    const dados = document.querySelectorAll(".dice");
    dados.forEach(dado => {
        const resultado = Math.floor(Math.random() * 6) + 1;
        dado.dataset.resultado = resultado;
        dado.textContent = resultado;
    });
    ordenarDados();
}

// Función para ordenar dados
function ordenarDados() {
    diceOrderSound.play();
    const dados = Array.from(document.querySelectorAll(".dice"));
    dados.sort((a, b) => b.dataset.resultado - a.dataset.resultado);
    dados.forEach(dado => dadosContainer.appendChild(dado));
}

// Evento para seleccionar jugadores
colorSelection.addEventListener("change", () => {
    jugadores = [];
    const seleccionados = colorSelection.querySelectorAll("input:checked");
    seleccionados.forEach(input => jugadores.push({ color: input.value }));
    inicializarDados();
});

// Evento para tirar los dados
rollDiceButton.addEventListener("click", tirarDados);

// Evento para reiniciar
resetButton.addEventListener("click", () => {
    jugadores = [];
    inicializarDados();
});

// Evento para desempate (ejemplo simplificado)
tieBreakButton.addEventListener("click", () => {
    const dados = Array.from(document.querySelectorAll(".dice"));
    const maxResultado = Math.max(...dados.map(d => d.dataset.resultado));
    jugadores = dados.filter(d => d.dataset.resultado == maxResultado).map(d => ({ color: d.dataset.color }));
    inicializarDados();
});
