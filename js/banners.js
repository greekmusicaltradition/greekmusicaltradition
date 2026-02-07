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

    // --- 2. Sticky Banner Logic (With Footer Fix) ---
    const stickyBanner = document.getElementById('stickyBanner');
    
    if (stickyBanner) {
        let stickyBannerClosed = false;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 300;
            
            // FIX: Find the footer element
            const footer = document.querySelector('footer');
            
            // FIX: Get its actual height (or default to 200 if not found)
            const footerHeight = footer ? footer.offsetHeight : 200;
            
            // FIX: Use the dynamic footerHeight in the calculation
            const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - footerHeight);
            
            if (scrolled && !stickyBannerClosed && !nearBottom) {
                stickyBanner.classList.add('show');
            } else {
                stickyBanner.classList.remove('show');
            }
        });
    }
});
