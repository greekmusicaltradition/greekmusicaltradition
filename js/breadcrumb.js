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

    // Process path segments
    pathnames.forEach((part, index) => {
        // Skip parts that are language codes (like 'en', 'gr') or filenames ('index.html')
        const isLanguageCode = part.length === 2 && /^[a-z]{2}$/.test(part);
        const isFilename = part.includes('.html');

        if (!isLanguageCode && !isFilename) {
            const fullPath = '/' + pathnames.slice(0, index + 1).join('/');
            const decodedPart = decodeURIComponent(part.replace(/-/g, ' '));
            const formattedText = decodedPart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            breadcrumbs.push({
                text: formattedText,
                href: fullPath
            });
        }
    });

    // Generate the HTML for the breadcrumb trail
    const breadcrumbHtml = breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const link = `<a href="${crumb.href}">${crumb.text}</a>`;
        const text = `<span>${crumb.text}</span>`;

        return `
            <li>
                ${isLast ? text : link}
            </li>
        `;
    }).join('\n');

    breadcrumbContainer.innerHTML = breadcrumbHtml;
});
