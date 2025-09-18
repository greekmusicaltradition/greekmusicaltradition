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
                            <div class="social-media-widgets">
                                <!-- Facebook Page Plugin Placeholder -->
                                <div class="facebook-widget-placeholder">
                                    <!-- REPLACE THIS COMMENT WITH FACEBOOK PAGE PLUGIN CODE -->
                                    <!-- Get your code from: https://developers.facebook.com/docs/plugins/page-plugin -->
                                    <div class="placeholder-content">
                                        <p>📘 Facebook Page Plugin</p>
                                        <small>Replace with official Facebook Page Plugin</small>
                                    </div>
                                </div>
                                
                                <!-- Instagram Feed Placeholder -->
                                <div class="instagram-widget-placeholder">
                                    <!-- REPLACE THIS COMMENT WITH INSTAGRAM EMBED CODE -->
                                    <!-- Options: Instagram Basic Display API, third-party widgets, or simple follow button -->
                                    <div class="placeholder-content">
                                        <p>📷 Instagram Widget</p>
                                        <small>Replace with official Instagram embed or follow button</small>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Alternative: Simple Social Links (if you prefer buttons over widgets) -->
                            <div class="social-media-links-fallback" style="display: none;">
                                <a href="${socialMediaLinks.facebook}" target="_blank" rel="noopener noreferrer" class="social-btn facebook-btn">
                                    <span>Follow on Facebook</span>
                                </a>
                                <a href="${socialMediaLinks.instagram}" target="_blank" rel="noopener noreferrer" class="social-btn instagram-btn">
                                    <span>Follow on Instagram</span>
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
