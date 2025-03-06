document.addEventListener("DOMContentLoaded", function() {
    const highlights = document.querySelectorAll('.highlight');
    const displayInterval = 2500; // Increased to allow for typing animation
    const pauseDuration = 5000;
    const totalDuration = (displayInterval * (highlights.length - 1)) + pauseDuration;

    function showHighlights() {
        // First, ensure all highlights are hidden
        highlights.forEach(highlight => {
            highlight.classList.remove('show');
        });

        // Show highlights one by one, each staying visible
        highlights.forEach((highlight, index) => {
            setTimeout(() => {
                highlight.classList.add('show');
            }, index * displayInterval);
        });

        // After all highlights are shown and pause duration has passed, hide all and restart
        setTimeout(() => {
            highlights.forEach(highlight => {
                highlight.classList.remove('show');
            });
            // Wait a brief moment before starting the next cycle
            setTimeout(showHighlights, 1000);
        }, totalDuration);
    }

    // Start the highlight display
    showHighlights();
});

