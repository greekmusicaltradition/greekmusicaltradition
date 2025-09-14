// =========================================================================
// AUTOMATIC BREADCRUMB GENERATION
// File: breadcrumb.js
// =========================================================================

class BreadcrumbGenerator {
    constructor() {
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
        
        // Always start with home
        breadcrumbItems.push({
            title: 'Home',
            url: '/',
            isHome: true,
            isCurrent: currentPath === '/'
        });
        
        // If we're not on homepage, process the path
        if (currentPath !== '/') {
            const pathParts = currentPath.split('/').filter(part => part.length > 0);
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
            console.error('Breadcrumb container not found');
            return;
        }
        
        const breadcrumbItems = this.generateBreadcrumbs(currentPath);
        let html = '';
        
        breadcrumbItems.forEach((item, index) => {
            // Add separator before non-first items
            if (index > 0) {
                html += `<li class="breadcrumb-separator">${this.separator}</li>`;
            }
            
            html += '<li class="breadcrumb-item">';
            
            if (item.url) {
                // Clickable link
                if (item.isHome) {
                    html += `<a href="${item.url}" class="breadcrumb-home">
                                <span class="breadcrumb-home-icon">${this.homeIcon}</span>
                                ${item.title}
                             </a>`;
                } else {
                    html += `<a href="${item.url}">${item.title}</a>`;
                }
            } else {
                // Current page (no link)
                if (item.isHome) {
                    html += `<span class="breadcrumb-home">
                                <span class="breadcrumb-home-icon">${this.homeIcon}</span>
                                ${item.title}
                             </span>`;
                } else {
                    html += item.title;
                }
            }
            
            html += '</li>';
        });
        
        container.innerHTML = html;
    }
    
    // Initialize and set up automatic updates
    init(containerId = 'breadcrumb') {
        this.render(containerId);
        
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
