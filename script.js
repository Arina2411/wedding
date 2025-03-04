document.addEventListener("DOMContentLoaded", function () {
    const weddingDate = new Date(2025, 7, 9, 0, 0, 0).getTime();
    const timerElement = document.getElementById("timer");

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft <= 0) {
            timerElement.innerHTML = "Свадьба уже состоялась!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerElement.innerHTML = days + " дней, " + hours + " часов, " + minutes + " минут, " + seconds + " секунд";
    }

    if (timerElement) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        console.error("Элемент с id='timer' не найден");
    }
});
