// --- SELECCIÓN DE ELEMENTOS DEL DOM ---

// Contenedores y textos principales
const color_display = document.querySelector("#colorDisplay");
const mensaje_display = document.querySelector("#message");
const h1 = document.querySelector("#h1");

// Botones de la barra de control
const reset_button = document.querySelector("#reset");
const easy_btn = document.querySelector("#easy");
const hard_btn = document.querySelector("#hard");

// Cuadrados de colores
const squares = document.querySelectorAll(".square");

// --- FUNCIONES AUXILIARES DE COLOR ---

const num_random = () => Math.floor(Math.random() * 256);

const Color_Aleatorio = () => `rgb(${num_random()}, ${num_random()}, ${num_random()})`;

const generarColoresAleatorios = (cantidad) => {
    const arreglo = [];
    for (let i = 0; i < cantidad; i++) {
        arreglo.push(Color_Aleatorio());
    }
    return arreglo;
};

// --- VARIABLES DE ESTADO ---

let numCuadrados = 6;
let colores = [];
let colorGanador;

// --- FUNCIONES DE LÓGICA DEL JUEGO ---

// Cambia todos los cuadrados visibles al color ganador
const cambiarColores = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    });
};

const reset = () => {
    // 1. Generar nuevos colores según la cantidad activa
    colores = generarColoresAleatorios(numCuadrados);

    // 2. Elegir un color ganador al azar de la lista
    colorGanador = colores[Math.floor(Math.random() * colores.length)];
    color_display.textContent = colorGanador;

    // 3. Limpiar mensajes y restaurar el color del h1
    mensaje_display.textContent = "";
    reset_button.textContent = "Nuevos Colores";
    h1.style.backgroundColor = "#2c2c3e";// O el color de fondo original de tu header

    // 4. Pintar los cuadrados
    squares.forEach((square, index) => {
        square.style.opacity = "1"; // Restaurar visibilidad
        square.style.pointerEvents = "auto"; // Restaurar interacción

        if (colores[index]) {
            square.style.display = "block";
            square.style.backgroundColor = colores[index];
        } else {
            square.style.display = "none";
        }
    });
};

// --- EVENT LISTENERS ---

// Evento de clic para cada cuadrado
squares.forEach((square) => {
    square.addEventListener("click", function () {
        const colorClickeado = this.style.backgroundColor;


        if (colorClickeado === colorGanador) {
            mensaje_display.textContent = "¡Correcto!";
            reset_button.textContent = "Play Again?";
            h1.style.backgroundColor = colorGanador;
            cambiarColores(colorGanador);
        } else {
            this.style.opacity = "0";
            this.style.pointerEvents = "none"; // Desactiva clics en el cuadrado fallido
            mensaje_display.textContent = "Inténtalo nuevamente";
        }
    });
});

// Botón de reinicio
reset_button.addEventListener("click", reset);

// Botón Modo Fácil
easy_btn.addEventListener("click", () => {
    easy_btn.classList.add("selected");
    hard_btn.classList.remove("selected");
    numCuadrados = 3;
    reset();
});

// Botón Modo Difícil
hard_btn.addEventListener("click", () => {
    hard_btn.classList.add("selected");
    easy_btn.classList.remove("selected");
    numCuadrados = 6;
    reset();
});

// --- INICIALIZACIÓN ---
reset();