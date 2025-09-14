// =========================================================================
// AUTOMATIC BREADCRUMB GENERATION
// File: breadcrumb.js
// =========================================================================

class BreadcrumbGenerator {
    constructor() {
        // Define language codes to filter from paths
        this.languageCodes = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh', 'ja'];
        
        // Define home-equivalent pages to filter from paths
        this.homePages = ['index', 'home', ''];
        
        // Define specific segments to filter from paths (new addition)
        this.filteredSegments = ['greekmusical', 'tradition'];
        
        // Define custom page titles for better readability
        this.pageTitles = {
            'lessons': 'Lessons',
            'piano': 'Piano',
            'voice': 'Voice Training',
            'guitar': 'Guitar',
            'violin': 'Violin',
            'drums': 'Drums',
            'beginner': 'Beginner Course',
            'intermediate': 'Intermediate Course',
            'advanced': 'Advanced Course',
            'about': 'About',
            'teaching-philosophy': 'Teaching Philosophy',
            'contact': 'Contact',
            'schedule-lesson': 'Schedule Lesson',
            'pricing': 'Pricing',
            'testimonials': 'Testimonials',
            'blog': 'Blog',
            'events': 'Events',
            'resources': 'Resources',
            'faq': 'FAQ',
            'gallery': 'Gallery'
        };
        
        this.homeIcon = '🏠'; // You can change this to Font Awesome icon: '<i class="fas fa-home"></i>'
        this.separator = '›';
    }
    
    // Convert URL segment to readable title
    formatTitle(segment) {
        if (this.pageTitles[segment]) {
            return this.pageTitles[segment];
        }
        
        // Default formatting: replace hyphens with spaces and capitalize
        return segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }
    
    // Generate breadcrumb items from current path
    generateBreadcrumbs(currentPath = window.location.pathname) {
        const breadcrumbItems = [];
        
        // Clean and filter the path
        let pathParts = currentPath.split('/').filter(part => part.length > 0);
        
        // Remove language codes, home-equivalent pages, and specific filtered segments
        pathParts = pathParts.filter(part => {
            const lowerPart = part.toLowerCase();
            // Check if it's a language code
            if (this.languageCodes.includes(lowerPart)) return false;
            // Check if it's a home page
            if (this.homePages.includes(lowerPart)) return false;
            // Check if it's in filtered segments
            if (this.filteredSegments.includes(lowerPart)) return false;
            // Check if it contains any filtered segments (for compound names)
            for (let filtered of this.filteredSegments) {
                if (lowerPart.includes(filtered)) return false;
            }
            return true;
        });
        
        // Always start with home
        const isHomePage = pathParts.length === 0;
        breadcrumbItems.push({
            title: 'Home',
            url: '/',
            isHome: true,
            isCurrent: isHomePage
        });
        
        // If we have actual subpages, process them
        if (!isHomePage) {
            let currentUrl = '';
            
            pathParts.forEach((part, index) => {
                currentUrl += '/' + part;
                const isLast = index === pathParts.length - 1;
                
                breadcrumbItems.push({
                    title: this.formatTitle(part),
                    url: isLast ? null : currentUrl, // Last item has no link
                    isHome: false,
                    isCurrent: isLast
                });
            });
        }
        
        return breadcrumbItems;
    }
    
    // Render breadcrumb HTML
    render(containerId = 'breadcrumb', currentPath = window.location.pathname) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Breadcrumb container not found: ' + containerId);
            return;
        }
        
        const breadcrumbItems = this.generateBreadcrumbs(currentPath);
        
        // Create breadcrumb list structure
        let html = '<nav class="breadcrumb-nav" aria-label="Breadcrumb"><ul class="breadcrumb-list">';
        
        breadcrumbItems.forEach((item, index) => {
            // Add separator before non-first items
            if (index > 0) {
                html += `<li class="breadcrumb-separator" aria-hidden="true">${this.separator}</li>`;
            }
            
            html += '<li class="breadcrumb-item">';
            
            if (item.url) {
                // Clickable link
                if (item.isHome) {
                    html += `<a href="${item.url}" class="breadcrumb-home" title="Go to homepage">
                                <span class="breadcrumb-home-icon" aria-hidden="true">${this.homeIcon}</span>
                                <span class="breadcrumb-text">${item.title}</span>
                             </a>`;
                } else {
                    html += `<a href="${item.url}" title="Go to ${item.title}">${item.title}</a>`;
                }
            } else {
                // Current page (no link)
                if (item.isHome) {
                    html += `<span class="breadcrumb-home breadcrumb-current" aria-current="page">
                                <span class="breadcrumb-home-icon" aria-hidden="true">${this.homeIcon}</span>
                                <span class="breadcrumb-text">${item.title}</span>
                             </span>`;
                } else {
                    html += `<span class="breadcrumb-current" aria-current="page">${item.title}</span>`;
                }
            }
            
            html += '</li>';
        });
        
        html += '</ul></nav>';
        container.innerHTML = html;
    }
    
    // Initialize and set up automatic updates
    init(containerId = 'breadcrumb') {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.render(containerId);
            });
        } else {
            this.render(containerId);
        }
        
        // Optional: Update breadcrumb when browser back/forward buttons are used
        window.addEventListener('popstate', () => {
            this.render(containerId);
        });
    }
}

// =========================================================================
// AUTO-INITIALIZE BREADCRUMB
// =========================================================================

// Create breadcrumb instance
const breadcrumb = new BreadcrumbGenerator();

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    breadcrumb.init();
});

// =========================================================================
// OPTIONAL: Manual methods for special cases
// =========================================================================

// Function to manually update breadcrumb (useful for SPA routing)
function updateBreadcrumb(path) {
    breadcrumb.render('breadcrumb', path);
}

// Function to add custom page titles dynamically
function addPageTitle(urlSegment, displayTitle) {
    breadcrumb.pageTitles[urlSegment] = displayTitle;
}

// Function to update breadcrumb for dynamic content
function setBreadcrumbPath(customPath) {
    breadcrumb.render('breadcrumb', customPath);
}

// Function to add segments to filter list dynamically
function addFilteredSegment(segment) {
    breadcrumb.filteredSegments.push(segment.toLowerCase());
}
