document.addEventListener("DOMContentLoaded", function () {
    // Дата свадьбы (год, месяц (0-11), день, часы, минуты, секунды)
    const weddingDate = new Date(2025, 7, 9, 0, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft <= 0) {
            document.getElementById("timer").innerHTML = "Свадьба уже состоялась!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд;
    }

    updateCountdown(); // Первоначальный запуск
    setInterval(updateCountdown, 1000); // Обновление каждую секунду
});
