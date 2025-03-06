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