// =============================================
// LÓGICA PARA EL PORTAFOLIO MÓVIL INTERACTIVO
// EFECTO DE FONDO MEJORADO CON TITILEO
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL FONDO DE PARTÍCULAS ---

    const generateFloatingDust = (size, selector, totalParticles, duration, color) => {
        const container = document.querySelector(selector);
        if (!container) return;

        // AUMENTAMOS LA OPACIDAD PARA HACERLAS MÁS VISIBLES
        const particleColors = [`${color}99`, `${color}BB`, `${color}DD`];
        const layer = [];
        for (let i = 0; i < totalParticles; i++) {
            const current_color = particleColors[Math.floor(Math.random() * particleColors.length)];
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            layer.push(`${x}vw ${y}vh 0 ${current_color}, ${x}vw ${y + 100}vh 0 ${current_color}`);
        }
        container.style.setProperty("--size", size);
        container.style.setProperty("--duration", duration);
        container.style.setProperty("--space-layer", layer.join(","));
    };

    const generateTwinklingStars = (selector, totalStars, color) => {
        const container = document.querySelector(selector);
        if (!container) return;
        container.innerHTML = ''; 

        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement('div');
            star.classList.add('twinkling-star');
            const size = Math.random() * 2 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const animDuration = Math.random() * 5 + 3;
            const animDelay = Math.random() * 5;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.backgroundColor = color;
            star.style.animationDuration = `${animDuration}s`;
            star.style.animationDelay = `${animDelay}s`;
            container.appendChild(star);
        }
    };

    // --- LÓGICA DE LAS TARJETAS INTERACTIVAS ---
    
    const stack = document.querySelector('.card-stack');
    if (!stack) return;

    let cards = Array.from(stack.querySelectorAll('.mobile-project-card')).reverse();
    let isDragging = false, startY, currentY, offsetY;
    let currentCard;

    function updateCardStyles() {
        if (cards.length > 0) {
            const activeCard = cards[0];
            const cardColorHex = rgbToHex(activeCard.style.backgroundColor);
            
            generateFloatingDust("1px", ".space-1", 150, "120s", cardColorHex);
            generateFloatingDust("2px", ".space-2", 70, "90s", cardColorHex);
            generateTwinklingStars(".space-3", 40, cardColorHex);
        }

        cards.forEach((card, index) => {
            if (index === 0) {
                card.style.transform = 'scale(1)'; card.style.opacity = '1'; card.style.pointerEvents = 'auto';
            } else if (index === 1) {
                card.style.transform = 'scale(0.95)'; card.style.opacity = '1'; card.style.pointerEvents = 'none';
            } else {
                card.style.transform = 'scale(0.9)'; card.style.opacity = '0'; card.style.pointerEvents = 'none';
            }
            card.style.zIndex = cards.length - index;
        });
    }

    function rgbToHex(rgb) {
        if (!rgb || rgb.startsWith('#')) return rgb || '#ffffff';
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function startDrag(e) {
        if (isDragging) return;
        isDragging = true;
        currentCard = e.currentTarget;
        startY = e.pageY || e.touches[0].pageY;
        currentCard.classList.add('card--dragging');
    }

    function doDrag(e) {
        if (!isDragging || !currentCard) return;
        e.preventDefault();
        currentY = e.pageY || e.touches[0].pageY;
        offsetY = currentY - startY;
        currentCard.style.transform = `translateY(${offsetY}px) rotate(${offsetY / 20}deg)`;
    }

    function endDrag(e) {
        if (!isDragging || !currentCard) return;
        isDragging = false;
        if (Math.abs(offsetY) > currentCard.offsetHeight / 4) {
            currentCard.classList.add('card--out');
            const removedCard = cards.shift();
            cards.push(removedCard);
            setTimeout(() => {
                stack.appendChild(removedCard);
                removedCard.classList.remove('card--out');
                removedCard.classList.remove('card--dragging');
                updateCardStyles();
            }, 500);
        } else {
            currentCard.style.transform = '';
            currentCard.classList.remove('card--dragging');
        }
        offsetY = 0;
    }
    
    cards.forEach(card => {
        card.addEventListener('mousedown', startDrag);
        card.addEventListener('touchstart', startDrag);
    });
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    updateCardStyles();
});