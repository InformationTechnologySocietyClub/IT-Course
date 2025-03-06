document.addEventListener('DOMContentLoaded', function() {
    // Stats data
    const stats = {
        studentsEnrolled: 500,
        graduates: 100,
        jobPlacementRate: 95
    };

    // Function to animate counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = element.id === 'job-placement-rate' ? 
                                currentValue + '%' : 
                                currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate all stats
    function animateStats() {
        animateValue(document.getElementById('students-enrolled'), 0, stats.studentsEnrolled, 2000);
        animateValue(document.getElementById('graduates'), 0, stats.graduates, 2000);
        animateValue(document.getElementById('job-placement-rate'), 0, stats.jobPlacementRate, 2000);
    }

    // Start animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats container
    observer.observe(document.getElementById('live-stats'));

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax::before');
        parallaxElements.forEach(function(element) {
            element.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        });
    });
});