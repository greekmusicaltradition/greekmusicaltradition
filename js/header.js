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
            brand: "greekmusicaltradition.com",
            nav: {
                home: "Home",
                lessons: "Lessons",
                lessonsOnline: "Online Lessons",
                lessonsLocal: "Local Lessons",
                about: "About",
                aboutMe: "About Me",
                aboutByzantine: "About Byzantine Music",
                aboutGreekSinging: "About Greek Singing",
                aboutGreekMusic: "About Greek Music",
                contact: "Contact"
            }
        },
        gr: {
            brand: "Ελληνική Μουσική Παράδοση",
            nav: {
                home: "Αρχική",
                lessons: "Μαθήματα",
                lessonsOnline: "Διαδικτυακά Μαθήματα",
                lessonsLocal: "Τοπικά Μαθήματα",
                about: "Σχετικά",
                aboutMe: "Σχετικά με Εμένα",
                aboutByzantine: "Σχετικά με τη Βυζαντινή Μουσική",
                aboutGreekSinging: "Σχετικά με το Ελληνικό Τραγούδι",
                aboutGreekMusic: "Σχετικά με την Ελληνική Μουσική",
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
                    <a href="index.html" class="brand-link">
                        <img src="../pictures/logo_woman.jpg" alt="Logo">
                        <span>${content[lang].brand}</span>
                    </a>
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
                    
                    <!-- Lessons Dropdown -->
                    <li class="dropdown ${['lessons_online', 'lessons_local'].includes(pageName) ? 'active' : ''}">
                        <a href="#" class="dropdown-toggle">${content[lang].nav.lessons} <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="lessons_online.html" class="${pageName === 'lessons_online' ? 'active' : ''}">${content[lang].nav.lessonsOnline}</a></li>
                            <li><a href="lessons_local.html" class="${pageName === 'lessons_local' ? 'active' : ''}">${content[lang].nav.lessonsLocal}</a></li>
                        </ul>
                    </li>
                    
                    <!-- About Dropdown -->
                    <li class="dropdown ${['about_me', 'about_byzantine', 'about_greek_singing', 'about_greek_music'].includes(pageName) ? 'active' : ''}">
                        <a href="#" class="dropdown-toggle">${content[lang].nav.about} <span class="dropdown-arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="about_me.html" class="${pageName === 'about_me' ? 'active' : ''}">${content[lang].nav.aboutMe}</a></li>
                            <li><a href="about_byzantine.html" class="${pageName === 'about_byzantine' ? 'active' : ''}">${content[lang].nav.aboutByzantine}</a></li>
                            <li><a href="about_greek_singing.html" class="${pageName === 'about_greek_singing' ? 'active' : ''}">${content[lang].nav.aboutGreekSinging}</a></li>
                            <li><a href="about_greek_music.html" class="${pageName === 'about_greek_music' ? 'active' : ''}">${content[lang].nav.aboutGreekMusic}</a></li>
                        </ul>
                    </li>
                    
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
    
    // Add dropdown functionality
    addDropdownFunctionality();
    
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
        link.addEventListener('click', (e) => {
            // Don't close menu if clicking dropdown toggle
            if (!link.classList.contains('dropdown-toggle')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
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

// Dropdown functionality
function addDropdownFunctionality() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                menu.style.display = 'block';
                setTimeout(() => menu.classList.add('show'), 10);
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('show');
                setTimeout(() => {
                    if (!menu.classList.contains('show')) {
                        menu.style.display = 'none';
                    }
                }, 200);
            }
        });
        
        // Mobile click behavior
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (window.innerWidth <= 768) {
                const isOpen = menu.classList.contains('show');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.classList.remove('show');
                        otherMenu.style.display = 'none';
                    }
                });
                
                // Toggle current dropdown
                if (isOpen) {
                    menu.classList.remove('show');
                    setTimeout(() => menu.style.display = 'none', 200);
                } else {
                    menu.style.display = 'block';
                    setTimeout(() => menu.classList.add('show'), 10);
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
                setTimeout(() => {
                    if (!menu.classList.contains('show')) {
                        menu.style.display = 'none';
                    }
                }, 200);
            });
        }
    });
}

// Helper function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '') || 'index';
}

// Language switching function - SINGLE VERSION FOR GITHUB PAGES
function switchLanguage(targetLang) {
    const currentPage = getCurrentPageName();
    const currentPath = window.location.pathname;
    
    // Extract repository name from path (for GitHub Pages)
    const pathSegments = currentPath.split('/').filter(segment => segment);
    
    let newPath;
    
    if (window.location.hostname.includes('github.io')) {
        // GitHub Pages - format: username.github.io/repository-name
        const repoName = pathSegments[0]; // First segment is repository name
        newPath = `/${repoName}/${targetLang}/${currentPage}.html`;
    } else if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
        // Local development
        newPath = `/${targetLang}/${currentPage}.html`;
    } else {
        // Other hosting (custom domain, etc.)
        newPath = `/${targetLang}/${currentPage}.html`;
    }
    
    console.log('Redirecting to:', newPath);
    window.location.href = newPath;
}

// Load header when page loads
document.addEventListener('DOMContentLoaded', loadHeader);
