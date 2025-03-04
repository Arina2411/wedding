document.addEventListener("DOMContentLoaded", function () {
    // ���� ������� (���, ����� (0-11), ����, ����, ������, �������)
    const weddingDate = new Date(2025, 7, 9, 0, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft <= 0) {
            document.getElementById("timer").innerHTML = "������� ��� ����������!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = ${days} ����, ${hours} �����, ${minutes} �����, ${seconds} ������;
    }

    updateCountdown(); // �������������� ������
    setInterval(updateCountdown, 1000); // ���������� ������ �������
});
