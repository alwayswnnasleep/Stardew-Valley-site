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
function showConsultant() {
    const consultant = document.getElementById('consultant');
    const textBlock = document.getElementById('textBlock');

    if (consultant.style.display === 'block') {
        // Скрыть консультанта и текстовый блок
        consultant.style.display = 'none';
        textBlock.style.display = 'none';
    } else {
        // Показать консультанта и текстовый блок
        consultant.style.display = 'block';
        textBlock.style.display = 'block';
        textBlock.style.opacity = '0'; // Начать скрытым
        
        // Использовать setTimeout для плавного появления
        setTimeout(() => {
            textBlock.style.opacity = '1'; // Появление
        }, 100);
    }
}



let lastScrollTop = 0;
const gameDescription = document.getElementById('game-description');
const scrollThreshold = 300; // Порог скролла в пикселях

window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        // Прокрутка вниз
        if (currentScrollTop > scrollThreshold) {
            gameDescription.classList.add('visible');
        }
    } else {
        // Прокрутка вверх
        gameDescription.classList.remove('visible');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Для мобильных или очень маленьких экранов
});
// Ensure the consultant starts hidden
window.onload = () => {
    const firstLink = document.querySelector('nav a');
    showSection('home', firstLink);
    const textBlock = document.getElementById('textBlock');
    textBlock.classList.add('fade-in');
    setTimeout(() => {
        textBlock.classList.add('visible');
    }, 10);
    showSection('home', firstLink);
    document.getElementById('consultant').style.display = 'none';
    document.getElementById('textBlock').style.display = 'none';
};