document.addEventListener("DOMContentLoaded", function () {
    // Дата и время свадьбы (9 августа 2025 года в 15:00)
    const weddingTime = new Date(2025, 7, 9, 15, 0, 0).getTime();
    const timerElement = document.getElementById("timer");

    if (timerElement) { // Проверяем, есть ли элемент с id="timer"
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = weddingTime - now;

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

            timerElement.innerHTML = ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

// Форма гостя и отправка в Telegram
document.getElementById("guestForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Остановить стандартную отправку формы

    let formData = new FormData(this);
    let message = "Новая заявка на свадьбу!\n";

    formData.forEach((value, key) => {
        if (key === "alcohol") {
            message += ${key}: ${formData.getAll("alcohol").join(", ")}\n;
        } else {
            message += ${key}: ${value}\n;
        }
    });

    let telegramBotToken = "8140359529:AAGE4JmFQftP-exNBJ7vhwzOznHTUR0in0s";
    let chatId = "939160971";
    let telegramUrl = https://api.telegram.org/bot${telegramBotToken}/sendMessage;

    fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Ответ отправлен!");
            document.getElementById("guestForm").reset();
        } else {
            alert("Ошибка отправки.");
        }
    })
    .catch(error => alert("Ошибка: " + error));
});
