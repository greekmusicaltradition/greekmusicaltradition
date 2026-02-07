document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 2. Sticky Banner Logic ---
    const stickyBanner = document.getElementById('stickyBanner');
    
    if (stickyBanner) {
        let stickyBannerClosed = false;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 300;
            
            // Calculate footer height dynamically to prevent overlap
            const footer = document.querySelector('footer');
            const footerHeight = footer ? footer.offsetHeight : 200;
            
            // Check if user is near the bottom
            const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - footerHeight);
            
            if (scrolled && !stickyBannerClosed && !nearBottom) {
                stickyBanner.classList.add('show');
            } else {
                stickyBanner.classList.remove('show');
            }
        });
    }
});
