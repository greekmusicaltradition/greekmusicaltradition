document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should fade in on scroll
    const fadeInElements = document.querySelectorAll('.fade-in-on-scroll');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Callback function for the Intersection Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is intersecting (in view)
                entry.target.classList.add('is-visible');
                // Stop observing once it's visible to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});
