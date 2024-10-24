document.addEventListener('DOMContentLoaded', function() {
    // Объект переводов для разных языков
    const translations = {
        en: {
            aboutTitle: "Thai Restaurant in Vilnius",
            aboutDescription: "Where you can enjoy various dishes made with traditional recipes and ingredients. Our restaurant offers authentic Thai flavors such as Tom Yum, Pad Thai, curry, spring rolls, and more.",
            contactInfo: "Contact Information",
            workingHours: "Working Hours",
            workingHoursContent: [
                "Monday: Closed",
                "Tuesday: 11:00 AM - 10:00 PM",
                "Wednesday: 11:00 AM - 10:00 PM",
                "Thursday: 11:00 AM - 10:00 PM",
                "Friday: 11:00 AM - 11:00 PM",
                "Saturday: 12:00 PM - 11:00 PM",
                "Sunday: 12:00 PM - 10:00 PM"
            ]
        },
        ru: {
            aboutTitle: "Тайский ресторан в Вильнюсе",
            aboutDescription: "Где вы можете наслаждаться различными блюдами, приготовленными по традиционным рецептам и ингредиентам. Наш ресторан предлагает аутентичные тайские вкусы, такие как Том Ям, Пад Тай, карри, спринг-роллы и многое другое.",
            contactInfo: "Контактная информация",
            workingHours: "Часы работы",
            workingHoursContent: [
                "Понедельник: Закрыто",
                "Вторник: 11:00 - 22:00",
                "Среда: 11:00 - 22:00",
                "Четверг: 11:00 - 22:00",
                "Пятница: 11:00 - 23:00",
                "Суббота: 12:00 - 23:00",
                "Воскресенье: 12:00 - 22:00"
            ]
        },
    };

    // Элементы модальных окон
    const contactModal = document.getElementById('contact-modal');
    const hoursModal = document.getElementById('hours-modal');
    const contactsLink = document.getElementById('contacts-link');
    const workingHoursLink = document.getElementById('working-hours-link');
    const closeButtons = document.getElementsByClassName('close-button');

    // Открытие модального окна при клике на "Contacts" и "Working hours"
    contactsLink.onclick = (event) => {
        event.preventDefault();
        contactModal.style.display = 'block';
    };

    workingHoursLink.onclick = (event) => {
        event.preventDefault();
        hoursModal.style.display = 'block';
    };

    // Закрытие модальных окон
    Array.from(closeButtons).forEach(button => {
        button.onclick = () => {
            contactModal.style.display = 'none';
            hoursModal.style.display = 'none';
        };
    });

    // Закрытие модальных окон при клике вне их
    window.onclick = (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
        if (event.target === hoursModal) {
            hoursModal.style.display = 'none';
        }
    };

    // Обработчик для бургер-меню
    const burger = document.getElementById('burger');
    const menuList = document.getElementById('menu-list');
    burger.onclick = () => {
        menuList.classList.toggle('active');
    };

    // Прокрутка навигационного меню
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.menu');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Закрытие меню при клике на его элементы
    document.querySelectorAll('.menu-link').forEach(item => {
        item.addEventListener('click', () => {
            menuList.classList.remove('active');
        });
    });

    // Функция для плавной прокрутки
    const smoothScroll = (targetId, duration) => {
        const targetElement = document.getElementById(targetId);
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Обработчики для плавной прокрутки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                smoothScroll(targetId, 1000); // Исправлено на 1000 мс
            }
        });
    });

    // Инициализация прокрутки изображений
    const scrollContainer = document.querySelector('.scroll-content');
    let isManualScroll = false; 
    let scrollTimeout;

    // Функция для клонирования изображений
    const cloneImages = () => {
        const images = Array.from(scrollContainer.children);
        images.forEach(image => {
            const clone = image.cloneNode(true);
            scrollContainer.appendChild(clone);
        });
    };
    cloneImages();

    // Функции для прокрутки влево и вправо
    const scrollLeft = () => {
        isManualScroll = true;
        clearTimeout(scrollTimeout);
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        resetScroll();
    };

    const scrollRight = () => {
        isManualScroll = true;
        clearTimeout(scrollTimeout);
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        resetScroll();
    };

    // Привязка функций прокрутки к кнопкам
    document.querySelector('.scroll-left').onclick = scrollLeft;
    document.querySelector('.scroll-right').onclick = scrollRight;

    // Бесконечная прокрутка
    const infiniteScroll = () => {
        if (!isManualScroll) {
            const firstImage = scrollContainer.children[0];
            const lastImage = scrollContainer.children[scrollContainer.children.length - 1];

            if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.insertBefore(lastImage, firstImage);
                scrollContainer.scrollLeft += lastImage.clientWidth;
            }

            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                scrollContainer.appendChild(firstImage);
                scrollContainer.scrollLeft -= firstImage.clientWidth;
            }
        }
        requestAnimationFrame(infiniteScroll);
    };

    const resetScroll = () => {
        scrollTimeout = setTimeout(() => {
            isManualScroll = false;
        }, 3000); 
    };

    // Запуск бесконечной прокрутки
    infiniteScroll();
});
