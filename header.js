// header.js
function loadHeader() {
    const headerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-brand">
                    <img src="pictures/banner_photo.png" alt="Logo">
                    <span>GreekMusicTradition...</span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="lessons.html">Lessons ▾</a></li>
                    <li><a href="about.html">About ▾</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    document.getElementById('header').innerHTML = headerHTML;
}

// Load header when page loads
document.addEventListener('DOMContentLoaded', loadHeader);
