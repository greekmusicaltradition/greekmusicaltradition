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
                                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                                    </svg>
                                </a>
                                <a href="${socialMediaLinks.instagram}" target="_blank" rel="noopener noreferrer" class="social-link instagram" aria-label="Instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
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
