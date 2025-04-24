document.addEventListener("DOMContentLoaded", function () {
    // ======= Таймер =======
    const timerElement = document.getElementById("timer");
    const weddingTime = new Date("2025-08-09T15:00:00").getTime();

    const isSameDate = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    function updateTimer() {
        const now = new Date().getTime();

        if (now >= weddingTime + 24 * 60 * 60 * 1000) {
            timerElement.innerHTML = "Спасибо, что разделили с нами этот важный момент!";
            return;
        } else if (now >= weddingTime) {
            timerElement.innerHTML = "Свадьба уже состоялась!";
            return;
        } else if (isSameDate(new Date(), new Date(weddingTime))) {
            timerElement.innerHTML = "Свадьба уже сегодня!";
            return;
        }

        const distance = weddingTime - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = days + "д " + hours + "ч " + minutes + "м " + seconds + "с";
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // ======= Отправка формы =======
    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(form);
        let message = "Новая заявка на свадьбу!\n";

        formData.forEach((value, key) => {
           if (key === "alcohol") return; // Обработаем позже
           message += key + ": " + value + "\n";
        });

        // Сбор выбранных вариантов алкоголя
        const alcoholOptions = form.querySelectorAll("input[name='alcohol']:checked");
        let alcoholList = [];
        alcoholOptions.forEach(option => alcoholList.push(option.value));
        message += alcohol: ${alcoholList.join(", ")}\n;

        const telegramBotToken = "8140359529:AAGE4JmFQftP-exNBJ7vhwzOznHTUR0in0s";
        const chatId = "939160971";
        const telegramUrl = https://api.telegram.org/bot${telegramBotToken}/sendMessage;

        fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Ответ отправлен!");
                form.reset();
            } else {
                alert("Ошибка отправки: " + data.description);
            }
        })
        .catch(error => alert("Ошибка: " + error));
    });
});
