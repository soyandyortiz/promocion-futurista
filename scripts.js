// Temporizador de 3 horas que se reinicia al entrar
const countdown = document.getElementById("countdown");
const countdownDuration = 3 * 60 * 60 * 1000; // 3 horas en milisegundos

function startCountdown() {
    const now = new Date().getTime();
    const endTime = now + countdownDuration;

    const x = setInterval(function () {
        const currentTime = new Date().getTime();
        const distance = endTime - currentTime;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "¡Oferta Expirada!";
        }
    }, 1000);
}

startCountdown();

// Conectar el formulario con el mensaje de selección
const form = document.getElementById("subscribe-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Simulación de envío con fetch
    fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL", {
        method: "POST",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            whatsapp: formData.get("whatsapp"),
            country: formData.get("country")
        }),
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById("status-message").innerText = "¡Felicidades! Serás considerado para acceder al descuento.";
    })
    .catch(error => {
        document.getElementById("status-message").innerText = "Hubo un error, por favor intenta de nuevo.";
    });
});
