let interaccionHabilitada = false;

function playMusic() {
    const audio = document.getElementById('birthday-audio');
    if (audio && audio.paused) {
        audio.play().catch(e => console.warn("No se pudo reproducir:", e));
    }
}

function apagarTodasLasVelitas() {
    document.querySelectorAll('.fuego').forEach((vela) => {
        vela.classList.add('apagado');
    });
}

function interactuar() {
    playMusic();
    if (interaccionHabilitada) {
        apagarTodasLasVelitas();

        // Mostrar una alerta visual antes de redirigir
        const overlay = document.createElement('div');
        overlay.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      font-family: 'Amatic SC', cursive;
      font-size: 42px;
      color: #8b6a60;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 1s ease;
    `;
        overlay.innerHTML = "Feliz Cumpleaños, Amor ❤️";
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = 0;
            setTimeout(() => {
                overlay.remove();
                window.location.href = "valentines-day-card.html"; // Redirección automática
            }, 1000);
        }, 3000); // Espera 3 segundos antes de pasar

        interaccionHabilitada = false;
    }
}

window.onload = () => {
    setTimeout(() => {
        interaccionHabilitada = true;
    }, 6500); // Tiempo total de animación del pastel
};
