document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let delay = 0;
    
    if (isElementInViewport(timelineItems[0])) {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, delay);
            delay += 500; // Add 500ms delay for each subsequent item
        });
    }
}

// Add scroll event listener with debounce to prevent multiple triggers
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleTimelineAnimation, 100);
});

// Initial check for visible elements
window.addEventListener('load', handleTimelineAnimation);