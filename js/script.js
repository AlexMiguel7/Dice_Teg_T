const agregarDadosAtaque = document.querySelector('#agregarDadosAtaque');
const contenedorDadosAtaque = document.querySelector('.contenedor-dados-ataque');
const quitarDadosAtaque = document.querySelector('#quitarDadosAtaque');

const agregarDadosDefensa = document.querySelector('#agregarDadosDefensa');
const contenedorDadosDefensa = document.querySelector('.contenedor-dados-defensa');
const quitarDadosDefensa = document.querySelector('#quitarDadosDefensa');

// Función para manejar la reproducción de sonidos de clic con reinicio
function playClickSound() {
  buttonClickSound.currentTime = 0; // Regresar al inicio del audio
  buttonClickSound.play();
}
// Función para manejar la reproducción de sonidos de clic con reinicio
function playlimitReachedSound() {
  limitReachedSound.currentTime = 0; // Regresar al inicio del audio
  limitReachedSound.play();
}

function crearNuevoDado() {
  const nuevoDado = document.createElement("div");
  nuevoDado.classList.add("dice");
  nuevoDado.innerHTML = `
      <div class="face front"></div>
      <div class="face back"></div>
      <div class="face top"></div>
      <div class="face bottom"></div>
      <div class="face right"></div>
      <div class="face left"></div>`;
  return nuevoDado;
}

function agregarDado(contenedor, maxDados) {
  const dados = contenedor.querySelectorAll('.dice');

  if (dados.length < maxDados) {
    contenedor.appendChild(crearNuevoDado());
    playClickSound(); // Sonido al agregar un dado
  }else {
    playlimitReachedSound(); // Sonido cuando se alcanza el límite
  }
}

function quitarDado(contenedor) {
  const dados = contenedor.querySelectorAll('.dice');

  if (dados.length > 1) {
    const ultimoDado = dados[dados.length - 1];
    contenedor.removeChild(ultimoDado);
    playClickSound(); // Sonido al agregar un dado
  }else {
    playlimitReachedSound(); // Sonido cuando se alcanza el límite
  }
}

// Eventos para Ataque
agregarDadosAtaque.addEventListener('click', () => {
  agregarDado(contenedorDadosAtaque, 4);
});

quitarDadosAtaque.addEventListener('click', () => {
  quitarDado(contenedorDadosAtaque);
});

// Eventos para Defensa
agregarDadosDefensa.addEventListener('click', () => {
  agregarDado(contenedorDadosDefensa, 4);
});

quitarDadosDefensa.addEventListener('click', () => {
  quitarDado(contenedorDadosDefensa);
});

// Código nuevo para el modo nocturno
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    
    // Alternar visibilidad de iconos
    sunIcon.style.display = sunIcon.style.display === 'none' ? 'block' : 'none';
    moonIcon.style.display = moonIcon.style.display === 'none' ? 'block' : 'none';
});


//  ########################################################
// Manejar el toggle del menú
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('.main-nav');
    const isClickOnMenuBtn = event.target.closest('.menu-btn');
    
    if (!isClickInsideNav && !isClickOnMenuBtn && navList.classList.contains('show')) {
        navList.classList.remove('show');
    }
});

// Cerrar menú al redimensionar
window.addEventListener('resize', () => {
    if (window.innerWidth > 515) {
        navList.classList.remove('show');
    }
});