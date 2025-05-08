// === CONFIGURACIÓN ===

const mensajesHackeo = [
  "CARGANDO MEMORIAS BONITAS...",
  "ERROR 404: TU SONRISA NO TIENE PERDÓN ❤️",
  "PROCESO DE FELICIDAD INICIADO 🥳",
  "DATOS RECUPERADOS: RISAS QUE NUNCA OLVIDARÉ 😊",
  "SISTEMA DE CARIÑO: ACTIVADO PARA TI 💖",
  "BIENVENIDO A OTRO AÑO DE ÉXITOS 🚀",
  "CLAVE DESCIFRADA: ERES ÚNICA/O EN MI VIDA 🌟",
  "MODULO DE RECUERDOS CARGADO CON AMOR 💾",
  "ACTIVANDO MODALIDAD CELEBRACIÓN 🥂",
  "DESCARGANDO: TODO LO BUENO QUE MERECES 🎁"
];

const imagenesHackeo = [
  "img/lucia.jpg",
  "img/pepe.jpg",
  "img/gola.jpg"
];

const tiempoMinimoParaAbrirCarta = 10000; // 10 segundos
let cartaDisponible = false;


// === FUNCIONES ===

function getRandomPositionExcluyendoCarta() {
  const carta = document.querySelector('.js-open-envelope')?.getBoundingClientRect();
  let left, top;

  do {
    left = Math.random() * window.innerWidth;
    top = Math.random() * window.innerHeight;
  } while (
    carta &&
    left >= carta.left - 30 &&
    left <= carta.right + 30 &&
    top >= carta.top - 30 &&
    top <= carta.bottom + 30
  );

  return {
    left: `${left}px`,
    top: `${top}px`
  };
}

function crearTexto() {
  const texto = $('<div>')
    .addClass('hacking-text')
    .text(mensajesHackeo[Math.floor(Math.random() * mensajesHackeo.length)]);

  texto.css({
    ...getRandomPositionExcluyendoCarta(),
    fontSize: `${Math.random() * 20 + 10}px`,
    position: 'absolute',
    zIndex: 1,
    color: '#0f0',
    fontFamily: 'monospace'
  });

  $('body').append(texto);
  setTimeout(() => texto.remove(), 600);
}

function crearImagen() {
  const img = $('<img>')
    .attr('src', imagenesHackeo[Math.floor(Math.random() * imagenesHackeo.length)])
    .addClass('hacking-img')
    .css({
      ...getRandomPositionExcluyendoCarta(),
      width: '60px',
      height: '60px',
      position: 'absolute',
      zIndex: 1,
      borderRadius: '6px'
    });

  $('body').append(img);
  setTimeout(() => img.remove(), 600);
}

function iniciarHackeo() {
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      crearTexto();
      crearImagen();
    }
  }, 100);
}

function efectoHackeo(elemento, textoFinal) {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pasos = 0;
  const maxPasos = Math.floor(textoFinal.length * 1.5);

  function hackear() {
    elemento.innerHTML = textoFinal
      .split("")
      .map((_, i) =>
        i < pasos ? textoFinal[i] : letras[Math.floor(Math.random() * letras.length)]
      )
      .join("");

    if (pasos <= maxPasos) {
      pasos++;
      requestAnimationFrame(hackear);
    } else {
      elemento.innerHTML = textoFinal;
    }
  }

  hackear();
}

function mostrarCarta() {
  const $self = $('.js-open-envelope');
  const envelope = $self.find('.envelope');

  envelope.removeClass('tossing').addClass('open');
  $self.find('.heart use').attr("xlink:href", "#icon-heart-broken");
  $self.find('.envelope__card').addClass('open');

  const cardText = $('.enveloper__card-text')[0];
  cardText.textContent = "";
  efectoHackeo(cardText, "Feliz Cumpleaños, Lucía ❤️");

  setTimeout(lanzarConfetiPersonalizado, 1000);
}

function lanzarConfetiPersonalizado() {
  confetti({
    particleCount: 500,
    spread: 160,
    origin: { y: 0.6 },
    ticks: 200,
    scalar: 1.4,
    startVelocity: 35,
    gravity: 0.7,
    drift: 2,
    shapes: ['heart'],
    colors: ['#ff4e50', '#f9c5c8', '#f9a7ab']
  });
}


// === INICIO ===

$(document).ready(function () {
  iniciarHackeo();

  setTimeout(() => {
    cartaDisponible = true;
  }, tiempoMinimoParaAbrirCarta);

  $(document).on('click', function () {
    const audio = document.getElementById("miMusica");

    if (audio.paused) {
      audio.play().catch(err => console.warn("Error al reproducir música:", err));
    } else if (cartaDisponible) {
      mostrarCarta();
    }
  });

  $('.js-open-envelope').on('click', function (e) {
    e.preventDefault();
    if (cartaDisponible) {
      mostrarCarta();
    }
  });
});
