/* ============================================================
   SEÁN O'MEARA — Main JS
   ============================================================ */

// Mobile menu helpers (defined early so handleScroll can use them)
const menuToggler = document.getElementById('menuToggler');
const navMenu = document.getElementById('navbarNav');

function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add('menu-open');
    document.body.classList.add('menu-locked');
}

function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('menu-open');
    document.body.classList.remove('menu-locked');
}

// Navbar: go solid on scroll
const nav = document.getElementById('mainNav');
const heroSection = document.querySelector('.hero');
let wasAtHero = false;

function handleScroll() {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const heroThreshold = heroSection ? heroSection.offsetHeight * 0.4 : 0;
    const atHero = heroSection && window.scrollY < heroThreshold;

    if (atHero) {
        document.body.classList.add('at-hero');
        wasAtHero = true;
    } else {
        document.body.classList.remove('at-hero');
        // only close menu when leaving the hero, not on every scroll
        if (wasAtHero) {
            closeMenu();
            wasAtHero = false;
        }
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run on load in case page is already scrolled

// Mobile fullscreen menu toggle
if (menuToggler && navMenu) {
    menuToggler.addEventListener('click', () => {
        navMenu.classList.contains('menu-open') ? closeMenu() : openMenu();
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Active nav link on scroll (index.html only)
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// Simple fade-in on scroll for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section-about, .section-music, .section-merch, .section-music-streaming, .section-tour, .site-footer').forEach(el => {
    el.classList.add('fade-section');
    observer.observe(el);
});
