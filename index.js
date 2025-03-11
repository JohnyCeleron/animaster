function animaster() {
    const obj = {};

    obj.move = function (element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
        return obj;
    };

    obj.scale = function (element, duration, ratio) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
        return obj;
    };

    obj.fadeIn = function (element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
        return obj;
    };

    obj.fadeOut = function (element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
        return obj;
    };

    obj.resetFadeIn = function (element) {
        element.style.transitionDuration = null;
        element.classList.remove('show');
        element.classList.add('hide');
        return obj;
    };

    obj.resetFadeOut = function (element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
        return obj;
    };

    obj.resetMove = function (element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
        return obj;
    };

    obj.resetScale = function (element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
        return obj;
    };

    obj.moveAndHide = function (element, duration) {
        const moveDuration = (duration / 5) * 2;
        const fadeDuration = (duration / 5) * 3;

        this.move(element, moveDuration, { x: 100, y: 20 });
        setTimeout(() => {
            this.fadeOut(element, fadeDuration);
        }, moveDuration);
        return obj;
    };

    obj.showAndHide = function (element, duration) {
        const stepDuration = duration / 3;

        this.fadeIn(element, stepDuration);
        setTimeout(() => {
            this.fadeOut(element, stepDuration);
        }, stepDuration * 2);
        return obj;
    };

    obj.heartBeating = function (element) {
        setInterval(() => {
            this.scale(element, 500, 1.4);
            setTimeout(() => {
                this.scale(element, 500, 1);
            }, 500);
        }, 1000);
        return obj;
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
    const fadeInBlock = document.getElementById('fadeInBlock');
    const fadeOutBlock = document.getElementById('fadeOutBlock');
    const moveBlock = document.getElementById('moveBlock');
    const scaleBlock = document.getElementById('scaleBlock');

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            animasterInstance.fadeIn(fadeInBlock, 1000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            animasterInstance.resetFadeIn(fadeInBlock);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            animasterInstance.fadeOut(fadeOutBlock, 1000);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            animasterInstance.resetFadeOut(fadeOutBlock);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            animasterInstance.move(moveBlock, 1000, { x: 100, y: 10 });
        });

    document.getElementById('resetMove')
        .addEventListener('click', function () {
            animasterInstance.resetMove(moveBlock);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            animasterInstance.scale(scaleBlock, 1000, 1.25);
        });

    document.getElementById('resetScale')
        .addEventListener('click', function () {
            animasterInstance.resetScale(scaleBlock);
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