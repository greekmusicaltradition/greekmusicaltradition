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
            nav: {
                home: "Home",
                lessons: "Lessons",
                about: "About",
                contact: "Contact"
            },
            lessonsTitle: "Lessons",
            lessonTypes: {
                byzantine: "Byzantine Music",
                traditional: "Traditional Singing",
                pricing: "Pricing"
            },
            contactTitle: "Contact",
            contactText: "Ready to begin your musical journey?",
            cta: "Get Started Today",
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
            nav: {
                home: "Αρχική",
                lessons: "Μαθήματα",
                about: "Σχετικά",
                contact: "Επικοινωνία"
            },
            lessonsTitle: "Μαθήματα",
            lessonTypes: {
                byzantine: "Βυζαντινή Μουσική",
                traditional: "Παραδοσιακό Τραγούδι",
                pricing: "Τιμές"
            },
            contactTitle: "Επικοινωνία",
            contactText: "Έτοιμοι να ξεκινήσετε το μουσικό σας ταξίδι;",
            cta: "Ξεκινήστε Σήμερα",
            legalTitle: "Νομικά",
            legal: {
                privacy: "Πολιτική Απορρήτου",
                terms: "Όροι Υπηρεσίας",
                lessonTerms: "Όροι Μαθημάτων"
            },
            copyright: "© 2025 Ελληνική Μουσική Παράδοση. Όλα τα δικαιώματα διατηρούνται."
        }
    };
    
    // Determine the correct path prefix for links
    const pathPrefix = isGreek ? 'gr' : 'en';
    const relativePath = currentPath.includes('/gr/') || currentPath.includes('/en/') ? '' : `${pathPrefix}/`;
    
    const footerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>${content[lang].title}</h4>
                        <p>${content[lang].description}</p>
                    </div>
                    <div class="footer-section">
                        <h4>${content[lang].quickLinks}</h4>
                        <ul class="footer-links">
                            <li><a href="${relativePath}index.html">${content[lang].nav.home}</a></li>
                            <li><a href="${relativePath}lessons.html">${content[lang].nav.lessons}</a></li>
                            <li><a href="${relativePath}about.html">${content[lang].nav.about}</a></li>
                            <li><a href="${relativePath}contact.html">${content[lang].nav.contact}</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>${content[lang].lessonsTitle}</h4>
                        <ul class="footer-links">
                            <li><a href="${relativePath}lessons.html#byzantine">${content[lang].lessonTypes.byzantine}</a></li>
                            <li><a href="${relativePath}lessons.html#traditional">${content[lang].lessonTypes.traditional}</a></li>
                            <li><a href="${relativePath}lessons.html#pricing">${content[lang].lessonTypes.pricing}</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>${content[lang].contactTitle}</h4>
                        <p>${content[lang].contactText}</p>
                        <a href="${relativePath}contact.html" class="footer-cta">${content[lang].cta}</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="footer-legal">
                        <h4>${content[lang].legalTitle}</h4>
                        <ul class="legal-links">
                            <li><a href="${relativePath}privacy-policy.html">${content[lang].legal.privacy}</a></li>
                            <li><a href="${relativePath}terms-of-service.html">${content[lang].legal.terms}</a></li>
                            <li><a href="${relativePath}lesson-terms.html">${content[lang].legal.lessonTerms}</a></li>
                        </ul>
                    </div>
                    <p>${content[lang].copyright}</p>
                </div>
            </div>
        </footer>
    `;
    
    document.getElementById('footer').innerHTML = footerHTML;
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', loadFooter);
