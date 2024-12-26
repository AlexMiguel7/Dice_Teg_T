//
const diceRollSound = new Audio('./assets/sounds/dice-throw_01.mp3');
const diceOrderSound = new Audio('./assets/sounds/dice-throw_02.mp3');
const buttonClickSound = new Audio('./assets/sounds/pop-click-01.mp3');
const limitReachedSound = new Audio('./assets/sounds/error-typing_01.mp3');

//rotaciones: el índice del array equivale al número del dado.
const rotaciones360 = [
    [360, 360],
    [270, 360],
    [360, 450],
    [360, 270],
    [450, 360],
    [540, 360],
];
const rotaciones720 = [
    [720, 720],
    [630, 720],
    [720, 810],
    [720, 630],
    [810, 720],
    [900, 720],
];

let rotacionesGuardadas = [];
let resultadosDadosAtaque = [];
let resultadosDadosDefensa = [];

const randomDice = () => {
    rollDice();
};

function rotar(x, y) {
    return `rotateX(${x}deg) rotateY(${y}deg)`;
}

const btnRollDice = document.querySelector(".roll");
const btnAgregarDadosAtaque = document.querySelector("#agregarDadosAtaque");
const btnQuitarDadosAtaque = document.querySelector("#quitarDadosAtaque");

const btnAgregarDadosDefensa = document.querySelector("#agregarDadosDefensa");
const btnQuitarDadosDefensa = document.querySelector("#quitarDadosDefensa");

// Función para reiniciar estilos de los dados
const resetearDados = () => {
    const dados = document.querySelectorAll(".dice");
    dados.forEach((dado) => {
        dado.classList.remove("win", "lose", "tie"); // Limpia las clases anteriores
        dado.classList.add("std"); // Agrega la clase estándar
    });
};

const rollDice = () => {
    console.log("----- Tiraste los dados -------");

    // Reproducir sonido al girar los dados
    diceRollSound.play();


    // Limpia los estilos de los dados
    resetearDados();

    const dice = document.querySelectorAll(".dice");
    resultadosDadosAtaque = [];
    resultadosDadosDefensa = [];

    /* desactivando botones mientras los dados giran */
    btnRollDice.disabled = true;
    btnAgregarDadosAtaque.disabled = true;
    btnQuitarDadosAtaque.disabled = true;

    btnAgregarDadosDefensa.disabled = true;
    btnQuitarDadosDefensa.disabled = true;

    // Girar todos los dados simultáneamente
    dice.forEach((dice, index) => {
        const random = Math.floor(Math.random() * 6);

        let rotation;

        // Alternar rotaciones entre 360 y 720
        if (rotacionesGuardadas[index]) {
            if (rotacionesGuardadas[index] === "rotaciones360") {
                rotation = rotaciones720[random];
                rotacionesGuardadas[index] = "rotaciones720";
            } else {
                rotation = rotaciones360[random];
                rotacionesGuardadas[index] = "rotaciones360";
            }
        } else {
            rotation = rotaciones360[random];
            rotacionesGuardadas[index] = "rotaciones360";
        }

        // Asigna la rotación al dado
        dice.style.transform = rotar(rotation[0], rotation[1]);

        /* guarda los resultados de los dados de ataque y defensa en un array */
        if (
            index <
            document
                .querySelector(".contenedor-dados-ataque")
                .querySelectorAll(".dice").length
        ) {
            resultadosDadosAtaque.push(random + 1);
        } else {
            resultadosDadosDefensa.push(random + 1);
        }
    });

    /* Espera para dar tiempo a que todos los dados completen sus animaciones */
    setTimeout(() => {
        console.log("Resultados de ataque:", resultadosDadosAtaque);
        console.log("Resultados de defensa:", resultadosDadosDefensa);

        // Ordenar los resultados de mayor a menor
        resultadosDadosAtaque.sort((a, b) => b - a);
        resultadosDadosDefensa.sort((a, b) => b - a);

        // Asignar los resultados ordenados a los elementos del DOM
        const diceAtaque = document
            .querySelector(".contenedor-dados-ataque").querySelectorAll(".dice");
        const diceDefensa = document
            .querySelector(".contenedor-dados-defensa").querySelectorAll(".dice");

        resultadosDadosAtaque.forEach((resultado, index) => {
            diceAtaque[index].style.transform = rotar(
                rotaciones360[resultado - 1][0],rotaciones360[resultado - 1][1]);
        });

        resultadosDadosDefensa.forEach((resultado, index) => {
            diceDefensa[index].style.transform = rotar(
                rotaciones360[resultado - 1][0],rotaciones360[resultado - 1][1]);
        });

        // Reproducir el sonido de ordenamiento de dados
    diceOrderSound.play();

        compararDados(resultadosDadosAtaque, resultadosDadosDefensa);

        /* luego de que giran los dados vuelvo a activar los botones */
        btnRollDice.disabled = false;
        btnAgregarDadosAtaque.disabled = false;
        btnQuitarDadosAtaque.disabled = false;

        btnAgregarDadosDefensa.disabled = false;
        btnQuitarDadosDefensa.disabled = false;
    }, 1000);
};

const compararDados = (ataque, defensa) => {
    let ejercitosPerdidosAtaque = 0;
    let ejercitosPerdidosDefensa = 0;

    const cantidadComparar = Math.min(ataque.length, defensa.length);

    const dadosAtaque = document.querySelectorAll(
        ".contenedor-dados-ataque .dice");
    const dadosDefensa = document.querySelectorAll(
        ".contenedor-dados-defensa .dice");

    for (let i = 0; i < cantidadComparar; i++) {
        console.log(
            `Comparando ataque: ${ataque[i]} con defensa: ${defensa[i]}`
        );

        dadosAtaque[i].classList.remove("win", "lose", "tie");
        dadosDefensa[i].classList.remove("win", "lose", "tie");

        if (ataque[i] > defensa[i]) {
            ejercitosPerdidosDefensa++;
            dadosAtaque[i].classList.add("win");
            dadosDefensa[i].classList.add("lose");
        } else if (ataque[i] < defensa[i]) {
            ejercitosPerdidosAtaque++;
            dadosAtaque[i].classList.add("lose");
            dadosDefensa[i].classList.add("win");
        } else {
            ejercitosPerdidosAtaque++;
            dadosAtaque[i].classList.add("tie");
            dadosDefensa[i].classList.add("tie");
        }
    }

    console.log(
        `Ejércitos perdidos por el atacante: ${ejercitosPerdidosAtaque}`
    );
    console.log(
        `Ejércitos perdidos por el defensor: ${ejercitosPerdidosDefensa}`
    );

    // Función para formatear el texto con el color solo para el número
    function formatearTextoEjercitos(cantidad, texto) {
        if (cantidad === 0) {
            return `${texto} no pierde ejércitos`;
        }

        return `${texto} pierde <span style="color: var(--text-army)">${cantidad}</span> ${
            cantidad === 1 ? "ejército" : "ejércitos"}`;
    }

    // Lógica para mostrar resultados
    const resultadoElement = document.querySelector(".resultado");
    resultadoElement.innerHTML = `
    ${formatearTextoEjercitos(ejercitosPerdidosAtaque, "El Atacante")}
    <br>
    ${formatearTextoEjercitos(ejercitosPerdidosDefensa, "El Defensor")}`;
};

btnRollDice.addEventListener("click", randomDice);
