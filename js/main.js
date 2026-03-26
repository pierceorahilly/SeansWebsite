/* ============================================================
   SEÁN O'MEARA — Main JS
   ============================================================ */

// Navbar: go solid on scroll
const nav = document.getElementById('mainNav');

function handleScroll() {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run on load in case page is already scrolled

// Mobile fullscreen menu toggle
const menuToggler = document.getElementById('menuToggler');
const navMenu = document.getElementById('navbarNav');

if (menuToggler && navMenu) {
    menuToggler.addEventListener('click', () => {
        navMenu.classList.toggle('menu-open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('menu-open');
        });
    });
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

document.querySelectorAll('.section-about, .section-music, .section-tour, .site-footer').forEach(el => {
    el.classList.add('fade-section');
    observer.observe(el);
});
