// header.js
function loadHeader() {
    // Detect current language from URL
    const currentPath = window.location.pathname;
    const isGreek = currentPath.includes('/gr/');
    const isEnglish = currentPath.includes('/en/');
    
    // Default to English if no language detected
    const lang = isGreek ? 'gr' : 'en';
    
    // Language-specific content
    const content = {
        en: {
            brand: "Greek Music Tradition",
            nav: {
                home: "Home",
                lessons: "Lessons",
                about: "About",
                contact: "Contact"
            }
        },
        gr: {
            brand: "Ελληνική Μουσική Παράδοση",
            nav: {
                home: "Αρχική",
                lessons: "Μαθήματα",
                about: "Σχετικά",
                contact: "Επικοινωνία"
            }
        }
    };
    
    // Get current page name
    const pageName = getCurrentPageName();
    
    const headerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-brand">
                    <img src="../pictures/banner_photo.png" alt="Logo">
                    <span>${content[lang].brand}</span>
                </div>
                
                <div class="nav-right">
                    <div class="language-switcher">
                        <button class="lang-btn ${lang === 'en' ? 'active' : ''}" 
                                onclick="switchLanguage('en')" 
                                title="English">
                            <span>English</span>
                        </button>
                        <button class="lang-btn ${lang === 'gr' ? 'active' : ''}" 
                                onclick="switchLanguage('gr')" 
                                title="Ελληνικά">
                            <span>Ελληνικά</span>
                        </button>
                    </div>
                    
                    <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
                
                <ul class="nav-menu">
                    <li><a href="index.html" class="${pageName === 'index' ? 'active' : ''}">${content[lang].nav.home}</a></li>
                    <li><a href="lessons.html" class="${pageName === 'lessons' ? 'active' : ''}">${content[lang].nav.lessons}</a></li>
                    <li><a href="about.html" class="${pageName === 'about' ? 'active' : ''}">${content[lang].nav.about}</a></li>
                    <li><a href="contact.html" class="${pageName === 'contact' ? 'active' : ''}">${content[lang].nav.contact}</a></li>
                    
                    <!-- Mobile language switcher -->
                    <li class="mobile-lang-switcher">
                        <div class="mobile-lang-buttons">
                            <button class="lang-btn ${lang === 'en' ? 'active' : ''}" 
                                    onclick="switchLanguage('en')">
                                <span>English</span>
                            </button>
                            <button class="lang-btn ${lang === 'gr' ? 'active' : ''}" 
                                    onclick="switchLanguage('gr')">
                                <span>Ελληνικά</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    
    document.getElementById('header').innerHTML = headerHTML;
    
    // Add mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// Helper function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '') || 'index';
}

// Language switching function
function switchLanguage(targetLang) {
    const currentPage = getCurrentPageName();
    
    // Get the current location details
    const protocol = window.location.protocol;
    const host = window.location.host;
    
    // Construct the new URL more reliably
    let newPath;
    
    // If we're on localhost or a development server
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
        newPath = `${protocol}//${host}/${targetLang}/${currentPage}.html`;
    } else {
        // For production servers
        newPath = `${protocol}//${host}/${targetLang}/${currentPage}.html`;
    }
    
    console.log('Redirecting to:', newPath); // Debug line - remove after testing
    
    // Redirect to new language version
    window.location.href = newPath;
}


// Load header when page loads
document.addEventListener('DOMContentLoaded', loadHeader);


// Language switching function with detailed debugging
function switchLanguage(targetLang) {
    const currentPage = getCurrentPageName();
    
    // Get all current location info
    const currentURL = window.location.href;
    const currentPath = window.location.pathname;
    const currentHost = window.location.host;
    const currentProtocol = window.location.protocol;
    
    // Log everything to console
    console.log('=== DEBUG INFO ===');
    console.log('Current URL:', currentURL);
    console.log('Current path:', currentPath);
    console.log('Current page:', currentPage);
    console.log('Target language:', targetLang);
    console.log('Host:', currentHost);
    console.log('Protocol:', currentProtocol);
    
    // Don't redirect yet - just show what would happen
    const testURL1 = `${currentProtocol}//${currentHost}/${targetLang}/${currentPage}.html`;
    const testURL2 = `/${targetLang}/${currentPage}.html`;
    const testURL3 = `${targetLang}/${currentPage}.html`;
    
    console.log('Test URL 1 (absolute):', testURL1);
    console.log('Test URL 2 (root relative):', testURL2);
    console.log('Test URL 3 (relative):', testURL3);
    
    // Try to redirect - uncomment ONE of these lines:
    // window.location.href = testURL1;
    // window.location.href = testURL2;
    window.location.href = testURL3;
}
