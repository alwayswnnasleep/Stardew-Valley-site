let lastPositionX = 0;

function showSection(sectionId, link) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none'; // Скрываем все секции
    });
    document.getElementById(sectionId).style.display = 'block'; // Показываем выбранную

    // Перемещение курицы
    const chickenRun = document.getElementById('chickenRun');
    const linkRect = link.getBoundingClientRect();
    const navRect = document.querySelector('nav').getBoundingClientRect();

    // Вычисляем позицию для перемещения курицы
    const targetX = linkRect.left + linkRect.width / 2 - chickenRun.width / 2;
    const targetY = linkRect.bottom + navRect.top - 10; // Позиция под заголовком

    // Определяем направление движения курицы
    if (targetX > lastPositionX) {
        chickenRun.src = 'chickenRun2.gif'; // Если движется вправо
    } else {
        chickenRun.src = 'chickenRun.gif'; // Если движется влево
    }

    chickenRun.style.left = `${targetX}px`;
    chickenRun.style.top = `${targetY}px`;

    // Обновляем последнюю позицию
    lastPositionX = targetX;
}

// Изначально позиционируем курицу
window.onload = () => {
    const firstLink = document.querySelector('nav a');
    showSection('home', firstLink);
};