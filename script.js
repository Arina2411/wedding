document.addEventListener("DOMContentLoaded", function () {
    // Дата и время свадьбы (9 августа 2025 года в 15:00)
    const weddingTime = new Date(2025, 7, 9, 15, 0, 0).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingTime - now;

        const timerElement = document.getElementById("timer");

        if (now >= weddingTime + 24 * 60 * 60 * 1000) {
            timerElement.innerHTML = "Спасибо, что разделили с нами этот важный момент!";
            return;
        } else if (now >= weddingTime) {
            timerElement.innerHTML = "Свадьба уже состоялась!";
            return;
        } else if (now >= weddingTime - 15 * 60 * 60 * 1000) { 
            timerElement.innerHTML = "Свадьба уже сегодня!";
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

