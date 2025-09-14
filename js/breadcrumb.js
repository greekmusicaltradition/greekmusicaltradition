document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    if (!breadcrumbContainer) {
        return;
    }

    const pathnames = window.location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '/';

    // Add the "Home" link
    breadcrumbs.push({
        text: 'Home',
        href: '/'
    });

    // Build the breadcrumb trail
    for (let i = 0; i < pathnames.length; i++) {
        const part = pathnames[i];
        
        // Skip specific segments like the root folder, language codes, and index files
        const isRootFolder = i === 0 && part === 'greekmusicaltradition';
        const isLanguageCode = part.length === 2 && /^[a-z]{2}$/.test(part);
        const isIndex = part === 'index.html';
        
        if (isRootFolder || isLanguageCode || isIndex) {
            continue;
        }

        // Handle the last segment (the current page)
        if (i === pathnames.length - 1 && part.includes('.html')) {
            const decodedPart = decodeURIComponent(part.replace(/-/g, ' ').replace('.html', ''));
            const formattedText = decodedPart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            breadcrumbs.push({
                text: formattedText,
                href: window.location.pathname
            });
            break; // Stop after processing the last part
        }

        // Handle directories
        currentPath += part + '/';
        const decodedPart = decodeURIComponent(part.replace(/-/g, ' '));
        const formattedText = decodedPart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        breadcrumbs.push({
            text: formattedText,
            href: currentPath
        });
    }

    // Generate the HTML for the breadcrumb trail with correct classes and separators
    const breadcrumbHtml = breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const link = `<a href="${crumb.href}">${crumb.text}</a>`;
        const text = `<span>${crumb.text}</span>`;
        const separator = !isLast ? `<span class="breadcrumb-separator">/</span>` : '';
        
        return `
            <li class="breadcrumb-item">
                ${isLast ? text : link}
                ${separator}
            </li>
        `;
    }).join('\n');

    breadcrumbContainer.innerHTML = breadcrumbHtml;
});
