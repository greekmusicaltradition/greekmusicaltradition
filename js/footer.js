// footer.js
function loadFooter() {
    // Detect current language from URL
    const currentPath = window.location.pathname;
    const isGreek = currentPath.includes('/gr/');
    
    // Default to English if no language detected
    const lang = isGreek ? 'gr' : 'en';
    
    // Language-specific content
    const content = {
        en: {
            title: "Greek Music Tradition",
            description: "Preserving and teaching the beautiful musical heritage of Greece through authentic lessons in Byzantine and traditional Greek music.",
            quickLinks: "Quick Links",
            socialMedia: "Follow Us",
            nav: {
                home: "Home",
                lessons: "Lessons",
                pricing: "Pricing",
                about: "About",
                contact: "Contact"
            },
            // Add subpages structure
            subPages: {
                lessons: [
                    { name: "Byzantine Music", link: "lessons.html" },
                    { name: "Traditional Singing", link: "lessons.html" },
                    { name: "Online Lessons", link: "lessons_online.html" },
                    { name: "Local Lessons", link: "lessons_local.html" }
                    
                ],
                about: [
                    { name: "Meet the Teachers", link: "about_teaching.html" },
                    { name: "About Byzantine Music", link: "about_byzantine.html" },
                    { name: "About Greek Traditional Singing", link: "about_greek_singing.html" },
                    { name: "About Greek Traditional Music", link: "about_greek_music.html"}
                ],
            },
            lessonsTitle: "Lessons",
            lessonTypes: {
                byzantine: "Byzantine Music",
                traditional: "Traditional Singing",
            },
            contactTitle: "Have Questions? We're Here to Help!",
            contactText: "Not sure where to begin? We'll help you choose the right path for your voice and interests.",
            cta: "Contact Us!",
            legal: {
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                lessonTerms: "Lesson Terms"
            },
            copyright: "© 2025 Greek Music Tradition. All rights reserved."
        },
        gr: {
            title: "Ελληνική Μουσική Παράδοση",
            description: "Διατηρώντας και διδάσκοντας την όμορφη μουσική κληρονομιά της Ελλάδας μέσω αυθεντικών μαθημάτων βυζαντινής και παραδοσιακής ελληνικής μουσικής.",
            quickLinks: "Γρήγοροι Σύνδεσμοι",
            socialMedia: "Ακολουθήστε μας",
            nav: {
                home: "Αρχική",
                lessons: "Μαθήματα",
                pricing: "Τιμές",
                about: "Σχετικά",
                contact: "Επικοινωνία"
            },
            // Add Greek subpages
            subPages: {
                lessons: [
                    { name: "Βυζαντινή Μουσική", link: "lessons.html#byzantine" },
                    { name: "Παραδοσιακό Τραγούδι", link: "lessons.html#traditional" }
                ],
                about: [
                    { name: "Η Ιστορία μας", link: "about.html#story" },
                    { name: "Φιλοσοφία Διδασκαλίας", link: "about.html#philosophy" },
                    { name: "Οι Καθηγητές", link: "about.html#teachers" }
                ],
                pricing: [
                    { name: "Ατομικά Μαθήματα", link: "pricing.html#individual" },
                    { name: "Ομαδικά Τμήματα", link: "pricing.html#group" },
                    { name: "Πακέτα", link: "pricing.html#packages" }
                ]
            },
            lessonsTitle: "Μαθήματα",
            lessonTypes: {
                byzantine: "Βυζαντινή Μουσική",
                traditional: "Παραδοσιακό Τραγούδι",
            },
            contactTitle: "Έχετε Ερωτήσεις? Είμαστε Εδώ για να Βοηθήσουμε!",
            contactText: "Δεν είστε σίγουροι από πού να ξεκινήσετε; Θα σας βοηθήσουμε να επιλέξετε την κατάλληλη πορεία για τη φωνή και τα ενδιαφέροντά σας.",
            contactHighlight: "Δωρεάν συμβουλευτική • Όλα τα επίπεδα ευπρόσδεκτα",
            cta: "Φόρμα Επικοινωνίας",
            legal: {
                privacy: "Πολιτική Απορρήτου",
                terms: "Όροι Υπηρεσίας",
                lessonTerms: "Όροι Μαθημάτων"
            },
            copyright: "© 2025 Ελληνική Μουσική Παράδοση. Όλα τα δικαιώματα διατηρούνται."
        }
    };
    
    // Social media configuration
    const socialMediaLinks = {
        facebook: "https://facebook.com/your-page-name", // Replace with your actual Facebook page URL
        instagram: "https://instagram.com/your-username" // Replace with your actual Instagram URL
    };
    
    // Determine the correct path prefix for links
    const pathPrefix = isGreek ? 'gr' : 'en';
    const relativePath = currentPath.includes('/gr/') || currentPath.includes('/en/') ? '' : `${pathPrefix}/`;
    
    // Define legal page paths
    const legalPaths = {
        privacy: isGreek ? '../gr/privacy_policy.html' : '../en/privacy_policy.html',
        terms: '../terms_of_service.html',
        lessonTerms: isGreek ? '../gr/lesson_terms.html' : '../en/lesson_terms.html'
    };
    
    // Function to generate navigation with subpages split into two columns
    function generateNavLinks() {
    // Manually split the navigation items for a more balanced layout
    const col1Items = ['home', 'lessons', 'pricing'];
    const col2Items = ['about', 'contact'];

    function generateColumnHTML(items) {
        let navHTML = '';
        items.forEach(item => {
            const mainLink = item === 'home' ? 'index.html' : `${item}.html`;
            
            navHTML += `<li class="nav-item-with-subs">
                <a href="${relativePath}${mainLink}" class="main-nav-link">${content[lang].nav[item]}</a>`;
            
            // Add subpages if they exist
            if (content[lang].subPages && content[lang].subPages[item]) {
                navHTML += '<ul class="sub-nav-links">';
                content[lang].subPages[item].forEach(subPage => {
                    navHTML += `<li><a href="${relativePath}${subPage.link}">${subPage.name}</a></li>`;
                });
                navHTML += '</ul>';
            }
            
            navHTML += '</li>';
        });
        return navHTML;
    }
        
        return `${generateColumnHTML(col1Items)}</ul>
            <ul class="footer-links quick-links-col">
                ${generateColumnHTML(col2Items)}`;
    }
    
    const footerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>${content[lang].title}</h4>
                        <p>${content[lang].description}</p>
                        <div class="social-media-section">
                            <h5>${content[lang].socialMedia}</h5>
                            <div class="social-media-links">
                                <a href="${socialMediaLinks.facebook}" target="_blank" rel="noopener noreferrer" class="social-link facebook" aria-label="Facebook">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="${socialMediaLinks.instagram}" target="_blank" rel="noopener noreferrer" class="social-link instagram" aria-label="Instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-section footer-quick-links-section">
                        <h4 class="quick-links-title">${content[lang].quickLinks}</h4>
                        <div class="quick-links-columns">
                            <ul class="footer-links quick-links-col">
                                ${generateNavLinks()}
                            </ul>
                        </div>
                    </div>
                    <div class="footer-section footer-contact-compact">
                        <h4>${content[lang].contactTitle}</h4>
                        <p class="contact-text">${content[lang].contactText}</p>
                        ${content[lang].contactHighlight ? `<p class="contact-highlight">${content[lang].contactHighlight}</p>` : ''}
                        <a href="${relativePath}contact.html" class="footer-cta-compact">${content[lang].cta}</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <ul class="legal-links">
                        <li><a href="${legalPaths.privacy}">${content[lang].legal.privacy}</a></li>
                        <li><a href="${legalPaths.terms}">${content[lang].legal.terms}</a></li>
                        <li><a href="${legalPaths.lessonTerms}">${content[lang].legal.lessonTerms}</a></li>
                    </ul>
                    <p>${content[lang].copyright}</p>
                </div>
            </div>
        </footer>
    `;
    
    document.getElementById('footer').innerHTML = footerHTML;
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', loadFooter);
