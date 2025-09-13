// header.js - fixed hamburger + language + safe outside click
function loadHeader() {
  const currentPath = window.location.pathname;
  const isGreek = currentPath.includes('/gr/');
  const lang = isGreek ? 'gr' : 'en';
  const pageName = getCurrentPageName();

  const content = {
    en: {
      brand: "greekmusicaltradition.com",
      nav: { home: "Home", lessons: "Lessons", pricing: "Pricing", about: "About", contact: "Contact" }
    },
    gr: {
      brand: "Ελληνική Μουσική Παράδοση",
      nav: { home: "Αρχική", lessons: "Μαθήματα", pricing: "Τιμές", about: "Σχετικά", contact: "Επικοινωνία" }
    }
  };

  const headerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <a href="${isGreek ? '/gr/index.html' : '/en/index.html'}" class="brand-link">
            <img src="/assets/logo.png" alt="Logo" />
            <span>${content[lang].brand}</span>
          </a>
        </div>

        <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="primary-menu" aria-label="Toggle navigation">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <ul id="primary-menu" class="nav-menu" role="menu">
          <li><a href="${isGreek ? '/gr/index.html' : '/en/index.html'}">${content[lang].nav.home}</a></li>
          <li><a href="${isGreek ? '/gr/lessons.html' : '/en/lessons.html'}">${content[lang].nav.lessons}</a></li>
          <li><a href="${isGreek ? '/gr/pricing.html' : '/en/pricing.html'}">${content[lang].nav.pricing}</a></li>
          <li><a href="${isGreek ? '/gr/about.html' : '/en/about.html'}">${content[lang].nav.about}</a></li>
          <li><a href="${isGreek ? '/gr/contact.html' : '/en/contact.html'}">${content[lang].nav.contact}</a></li>
          <li class="mobile-lang-switcher">
            <div class="mobile-lang-buttons">
              <button class="lang-btn ${lang==='en'?'active':''}" data-lang="en" type="button">English</button>
              <button class="lang-btn ${lang==='gr'?'active':''}" data-lang="gr" type="button">Ελληνικά</button>
            </div>
          </li>
        </ul>

        <div class="nav-right">
          <div class="language-switcher">
            <button class="lang-btn ${lang==='en'?'active':''}" data-lang="en" type="button">English</button>
            <button class="lang-btn ${lang==='gr'?'active':''}" data-lang="gr" type="button">Ελληνικά</button>
          </div>
        </div>
      </div>
    </nav>
  `;

  const mount = document.getElementById('header');
  if (mount) mount.innerHTML = headerHTML;

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.classList.toggle('active');
      const open = navMenu.classList.contains('active');
      mobileToggle.classList.toggle('active', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside the nav-container
    document.addEventListener('click', (e) => {
      const container = e.target.closest('.nav-container');
      const menuOpen = navMenu.classList.contains('active');
      if (!container && menuOpen) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Language switching
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lang');
      switchLanguage(target);
    });
  });
}

function getCurrentPageName() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  return filename.replace('.html', '') || 'index';
}

function switchLanguage(targetLang) {
  const currentPage = getCurrentPageName();
  const currentPath = window.location.pathname;
  const segments = currentPath.split('/').filter(Boolean);
  let newPath;

  if (window.location.hostname.includes('github.io')) {
    // username.github.io/repo/...
    const repo = segments || '';
    newPath = `/${repo}/${targetLang}/${currentPage}.html`;
  } else {
    newPath = `/${targetLang}/${currentPage}.html`;
  }

  window.location.href = newPath;
}

document.addEventListener('DOMContentLoaded', loadHeader);
