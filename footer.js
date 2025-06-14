// footer.js
function loadFooter() {
    const footerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Greek Music Tradition</h4>
                        <p>Preserving and teaching the beautiful musical heritage of Greece through authentic lessons in Byzantine and traditional Greek music.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="lessons.html">Lessons</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Lessons</h4>
                        <ul class="footer-links">
                            <li><a href="lessons.html#byzantine">Byzantine Music</a></li>
                            <li><a href="lessons.html#traditional">Traditional Singing</a></li>
                            <li><a href="lessons.html#pricing">Pricing</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Contact</h4>
                        <p>Ready to begin your musical journey?</p>
                        <a href="contact.html" class="footer-cta">Get Started Today</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Greek Music Tradition. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    document.getElementById('footer').innerHTML = footerHTML;
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', loadFooter);
