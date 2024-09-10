let lastPositionX = 0; // Начальная позиция курицы
let chickenWay = "right";



window.onload = function() {
    const chickenRun = document.getElementById('chickenRun');
    chickenRun.style.position = 'absolute'; // Ensure the chicken is positioned absolutely
    chickenRun.style.left = '0px'; // Initial left position
    chickenRun.style.top = '0px'; // Initial top position
};

function showSection(sectionId, link) {
    // Получаем все элементы с классом 'content'
    const sections = document.querySelectorAll('.content');
    // Скрываем все секции
    sections.forEach(section => {
        section.style.display = 'none';
    });
    // Показываем выбранную секцию по её ID
    document.getElementById(sectionId).style.display = 'block';

    // Перемещение курицы
    const chickenRun = document.getElementById('chickenRun'); // Получаем элемент курицы
    const linkRect = link.getBoundingClientRect(); // Получаем размеры и положение ссылки
    const navRect = document.querySelector('nav').getBoundingClientRect(); // Получаем размеры и положение навигации

    // Вычисляем целевую позицию для курицы
    const targetX = linkRect.left + linkRect.width / 2 - chickenRun.width / 2; // Центрируем курицу по горизонтали
    const targetY = linkRect.bottom + navRect.top - 10; // Устанавливаем курицу под заголовком

    // Определяем направление движения курицы
    if (targetX > lastPositionX) {
        chickenRun.src = 'chickenRun2.gif'; // Если движется вправо, меняем источник изображения на правое
        chickenWay = "right";
    } else {
        chickenRun.src = 'chickenRun.gif';  // Если движется влево, меняем источник изображения на левое
        chickenWay = "left";
    }

    // Устанавливаем позиции курицы
    chickenRun.style.left = `${targetX}px`;
    chickenRun.style.top = `${targetY}px`;

    // Обновляем последнюю позицию курицы
    lastPositionX = targetX;
    
    // Устанавливаем таймер для смены изображения на сидящую курицу
    setTimeout(() => {
        chickenRun.src = chickenWay === "left" ? 'chickenSit.png' : 'chickenSit2.png';
        if(sectionId=='home')
            chickenRun.src = 'chickenSit2.png';
        if(sectionId=='guide')
            chickenRun.src = 'chickenSit.png'
    }, 1500);
    
}

// Функция для показа или скрытия консультанта и текстового блока
function showConsultant() {
    const consultant = document.getElementById('consultant'); // Получаем элемент консультанта
    const textBlock = document.getElementById('textBlock'); // Получаем текстовый блок

    // Если консультант уже виден, скрываем его и текст
    if (consultant.style.display === 'block') {
        consultant.style.display = 'none';
        textBlock.style.display = 'none';
    } else {
        // Иначе, показываем консультанта и текстовый блок
        consultant.style.display = 'block';
        textBlock.style.display = 'block';
        textBlock.style.opacity = '0'; // Начинаем с полной прозрачности
        
        // Используем setTimeout для плавного появления текстового блока
        setTimeout(() => {
            textBlock.style.opacity = '1'; // Устанавливаем непрозрачность для появления
        }, 100);
    }
}

// Переменная для хранения последнего положения прокрутки
let lastScrollTop = 0;
// Получаем элемент описания игры
const gameDescription = document.getElementById('game-description');
// Порог прокрутки, при достижении которого будет показано описание
const scrollThreshold = 390; 

// Добавляем обработчик события прокрутки окна
window.addEventListener('scroll', () => {
    // Получаем текущее положение прокрутки
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        // Если прокручиваем вниз
        if (currentScrollTop > scrollThreshold) {
            gameDescription.classList.add('visible'); // Добавляем класс видимости
        }
    } else if(currentScrollTop<scrollThreshold){
        // Если прокручиваем вверх
        gameDescription.classList.remove('visible'); // Убираем класс видимости
    }

    // Обновляем последнее положение прокрутки
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Устанавливаем значение для мобильных устройств
});

// Функция, которая запускается при загрузке окна
window.onload = () => {
    const firstLink = document.querySelector('nav a'); // Получаем первую ссылку в навигации
    showSection('home', firstLink); // Показываем домашнюю секцию
    const textBlock = document.getElementById('textBlock'); // Получаем текстовый блок
    textBlock.classList.add('fade-in'); // Добавляем класс для анимации появления
    setTimeout(() => {
        textBlock.classList.add('visible'); // Через 10 мс добавляем класс видимости
    }, 10);
    showSection('home', firstLink); // Показать секцию снова
    document.getElementById('consultant').style.display = 'none'; // Убедиться, что консультант скрыт
    document.getElementById('textBlock').style.display = 'none'; // Убедиться, что текстовый блок скрыт
};