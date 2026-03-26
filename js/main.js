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

document.querySelectorAll('.section-about, .section-music, .section-tour, .site-footer').forEach(el => {
    el.classList.add('fade-section');
    observer.observe(el);
});
