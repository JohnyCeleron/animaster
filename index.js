function animaster() {
    const obj = {};

    obj.move = function (element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.scale = function (element, duration, ratio) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.fadeIn = function (element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.fadeOut = function (element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.moveAndHide = function (element, duration) {
        const moveDuration = (duration / 5) * 2;
        const fadeDuration = (duration / 5) * 3;

        this.move(element, moveDuration, { x: 100, y: 20 });
        setTimeout(() => {
            this.fadeOut(element, fadeDuration);
        }, moveDuration);
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.showAndHide = function (element, duration) {
        const stepDuration = duration / 3;

        this.fadeIn(element, stepDuration);
        setTimeout(() => {
            this.fadeOut(element, stepDuration);
        }, stepDuration * 2);
        return obj; // Возвращаем объект для цепочки вызовов
    };

    obj.heartBeating = function (element) {
        setInterval(() => {
            this.scale(element, 500, 1.4);
            setTimeout(() => {
                this.scale(element, 500, 1);
            }, 500);
        }, 1000);
        return obj; // Возвращаем объект для цепочки вызовов
    };

    return obj;
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

// Инициализация анимаций
const animasterInstance = animaster();

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animasterInstance.fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animasterInstance.fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animasterInstance.move(block, 1000, { x: 100, y: 10 });
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animasterInstance.scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animasterInstance.moveAndHide(block, 5000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animasterInstance.showAndHide(block, 3000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animasterInstance.heartBeating(block);
        });
}

addListeners();