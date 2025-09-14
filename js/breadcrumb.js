// =========================================================================
// AUTOMATIC BREADCRUMB GENERATION
// File: breadcrumb.js
// =========================================================================

class BreadcrumbGenerator {
    constructor() {
        // Define language codes to filter from paths
        this.languageCodes = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh', 'ja'];
        
        // Define home-equivalent pages to filter from paths
        this.homePages = ['index', 'home', '', 'index.html', 'index.htm'];
        
        // Define specific segments to filter from paths
        this.filteredSegments = ['greekmusical', 'tradition', 'greekmusical-tradition'];
        
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
        
        this.homeIcon = '🏠';
        this.separator = '›';
    }
    
    // Convert URL segment to readable title
    formatTitle(segment) {
        // Remove file extensions
        segment = segment.replace(/\.(html?|php|asp|jsp)$/i, '');
        
        if (this.pageTitles[segment.toLowerCase()]) {
            return this.pageTitles[segment.toLowerCase()];
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
        
        // Remove unwanted segments
        pathParts = pathParts.filter(part => {
            const lowerPart = part.toLowerCase();
            // Remove file extensions for comparison
            const cleanPart = lowerPart.replace(/\.(html?|php|asp|jsp)$/i, '');
            
            // Filter out language codes
            if (this.languageCodes.includes(cleanPart)) return false;
            // Filter out home pages
            if (this.homePages.includes(cleanPart)) return false;
            // Filter out specific segments
            if (this.filteredSegments.includes(cleanPart)) return false;
            // Filter out segments containing filtered terms
            for (let filtered of this.filteredSegments) {
                if (cleanPart.includes(filtered)) return false;
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
        
        // Add subpages if they exist
        if (!isHomePage) {
            let currentUrl = '';
            
            pathParts.forEach((part, index) => {
                currentUrl += '/' + part;
                const isLast = index === pathParts.length - 1;
                
                breadcrumbItems.push({
                    title: this.formatTitle(part),
                    url: isLast ? null : currentUrl,
                    isHome: false,
                    isCurrent: isLast
                });
            });
        }
        
        return breadcrumbItems;
    }
    
    // Render breadcrumb HTML with inline styles
    render(containerId = 'breadcrumb', currentPath = window.location.pathname) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Breadcrumb container not found: ' + containerId);
            return;
        }
        
        const breadcrumbItems = this.generateBreadcrumbs(currentPath);
        
        // If only home page, don't show breadcrumb
        if (breadcrumbItems.length === 1 && breadcrumbItems[0].isCurrent) {
            container.innerHTML = '';
            return;
        }
        
        // Create horizontal breadcrumb with inline styles
        let html = '<div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none;">';
        
        breadcrumbItems.forEach((item, index) => {
            // Add separator before non-first items
            if (index > 0) {
                html += `<span style="color: #666; user-select: none;">${this.separator}</span>`;
            }
            
            if (item.url) {
                // Clickable link
                if (item.isHome) {
                    html += `<a href="${item.url}" style="display: flex; align-items: center; gap: 4px; text-decoration: none; color: #0066cc;">
                                <span>${this.homeIcon}</span>
                                <span>${item.title}</span>
                             </a>`;
                } else {
                    html += `<a href="${item.url}" style="text-decoration: none; color: #0066cc;">${item.title}</a>`;
                }
            } else {
                // Current page (no link)
                if (item.isHome) {
                    html += `<span style="display: flex; align-items: center; gap: 4px; font-weight: 500; color: #333;">
                                <span>${this.homeIcon}</span>
                                <span>${item.title}</span>
                             </span>`;
                } else {
                    html += `<span style="font-weight: 500; color: #333;">${item.title}</span>`;
                }
            }
        });
        
        html += '</div>';
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
        
        // Update breadcrumb when browser back/forward buttons are used
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
