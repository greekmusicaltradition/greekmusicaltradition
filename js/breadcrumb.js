document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.getElementById('breadcrumb');
    if (!breadcrumbContainer) {
        return;
    }

    const pathnames = window.location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Add the "Home" link
    breadcrumbs.push({
        text: 'Home',
        href: '/'
    });

    // Build the breadcrumb trail
    for (let i = 0; i < pathnames.length; i++) {
        const part = pathnames[i];
        
        // Skip specific segments
        const isRootFolder = i === 0 && part === 'greekmusicaltradition';
        const isLanguageCode = part.length === 2 && /^[a-z]{2}$/.test(part);
        const isFilename = part.includes('.html');
        
        if (isRootFolder || isLanguageCode) {
            continue; // Skip these segments and move to the next one
        }

        // Handle filenames differently
        if (isFilename) {
            const decodedPart = decodeURIComponent(part.replace(/-/g, ' '));
            let formattedText = decodedPart.replace('.html', '');
            
            // Special cases for filenames that should have a specific name
            if (formattedText === 'index') {
                formattedText = ''; // Don't display "index" in the breadcrumb
            } else if (formattedText === 'privacy-policy') {
                formattedText = 'Privacy Policy';
            } else if (formattedText === 'terms-of-service') {
                formattedText = 'Terms of Service';
            } else if (formattedText === 'lesson-terms') {
                formattedText = 'Lesson Terms';
            } else {
                formattedText = formattedText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }

            if (formattedText) {
                breadcrumbs.push({
                    text: formattedText,
                    href: window.location.pathname
                });
            }
            break; // Stop after finding the filename
        }

        // Process a regular directory part
        const fullPath = '/' + pathnames.slice(0, i + 1).join('/');
        const decodedPart = decodeURIComponent(part.replace(/-/g, ' '));
        const formattedText = decodedPart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        breadcrumbs.push({
            text: formattedText,
            href: fullPath
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
