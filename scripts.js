document.addEventListener('DOMContentLoaded', function() {
    // Example data, you can replace this with real data from an API or database
    const stats = {
        studentsEnrolled: 500,
        graduates: 100,
        jobPlacementRate: 95
    };

    // Update the stats in the HTML
    document.getElementById('students-enrolled').textContent = stats.studentsEnrolled;
    document.getElementById('graduates').textContent = stats.graduates;
    document.getElementById('job-placement-rate').textContent = stats.jobPlacementRate + '%';

     // Parallax effect
     window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax::before');
        parallaxElements.forEach(function(element) {
            element.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        });
    });
});