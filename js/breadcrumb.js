document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    if (!breadcrumbContainer) {
        return;
    }

    const pathnames = window.location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';

    // Add the "Home" link
    breadcrumbs.push({
        text: 'Home',
        href: '/'
    });

    // Process each part of the URL path
    pathnames.forEach((part, index) => {
        // Skip root folder and language code
        const isRootFolder = index === 0 && part === 'greekmusicaltradition';
        const isLanguageCode = part.length === 2 && /^[a-z]{2}$/.test(part);
        
        if (isRootFolder || isLanguageCode) {
            return;
        }

        // Handle the last segment of the path (the current page)
        const isLastPart = index === pathnames.length - 1;
        const isFilename = part.includes('.html');

        if (isLastPart && isFilename) {
            // This is the final page. Format the name and add it as text, not a link.
            const formattedText = decodeURIComponent(part.replace(/-/g, ' ').replace('.html', ''));
            const finalFormattedText = formattedText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            breadcrumbs.push({
                text: finalFormattedText,
                href: window.location.pathname, // The href is the full path
                isLast: true
            });
            return;
        }

        // For all other directories, create a link
        currentPath += '/' + part;
        const formattedText = decodeURIComponent(part.replace(/-/g, ' '));
        const finalFormattedText = formattedText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        breadcrumbs.push({
            text: finalFormattedText,
            href: currentPath
        });
    });

    // Generate the HTML for the breadcrumb trail
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
