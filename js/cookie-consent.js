// js/cookie-consent.js
class CookieConsent {
    constructor() {
        this.cookieName = 'cookie-consent';
        this.cookieValue = 'accepted';
        this.cookieDays = 365;
        this.init();
    }

    init() {
        if (!this.hasConsented()) {
            this.createBanner();
        }
    }

    hasConsented() {
        return this.getCookie(this.cookieName) === this.cookieValue;
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    detectLanguage() {
        const path = window.location.pathname;
        if (path.includes('/gr/')) return 'gr';
        if (path.includes('/en/')) return 'en';
        
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('el') ? 'gr' : 'en';
    }

    createBanner() {
        const currentLang = this.detectLanguage();
        const translations = {
            en: {
                text: "We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.",
                accept: "Accept",
                decline: "Decline"
            },
            gr: {
                text: "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στην ιστοσελίδα μας. Συνεχίζοντας την περιήγηση, συμφωνείτε με τη χρήση cookies.",
                accept: "Αποδοχή",
                decline: "Απόρριψη"
            }
        };

        const translation = translations[currentLang];
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-text">
                    <p>${translation.text}</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="cookie-btn accept">${translation.accept}</button>
                    <button id="cookie-decline" class="cookie-btn decline">${translation.decline}</button>
                </div>
            </div>
        `;

        this.addStyles();
        document.body.appendChild(banner);
        
        document.getElementById('cookie-accept').onclick = () => this.acceptCookies();
        document.getElementById('cookie-decline').onclick = () => this.declineCookies();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.95);
                color: white;
                padding: 1rem;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            }
            
            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .cookie-text p {
                margin: 0;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .cookie-buttons {
                display: flex;
                gap: 0.5rem;
            }
            
            .cookie-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .cookie-btn.accept {
                background: #4b7988;
                color: white;
            }
            
            .cookie-btn.accept:hover {
                background: #5a8a9f;
            }
            
            .cookie-btn.decline {
                background: transparent;
                color: #ccc;
                border: 1px solid #666;
            }
            
            .cookie-btn.decline:hover {
                background: #666;
                color: white;
            }
            
            @media (max-width: 768px) {
                .cookie-consent-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .cookie-buttons {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    acceptCookies() {
        this.setCookie(this.cookieName, this.cookieValue, this.cookieDays);
        this.removeBanner();
        this.initializeTracking();
    }

    declineCookies() {
        this.setCookie(this.cookieName, 'declined', this.cookieDays);
        this.removeBanner();
        this.disableTracking();
    }

    removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    initializeTracking() {
        // Add your analytics code here (Google Analytics, etc.)
        console.log('Tracking initialized');
    }

    disableTracking() {
        // Disable analytics
        console.log('Tracking disabled');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CookieConsent());
} else {
    new CookieConsent();
}
