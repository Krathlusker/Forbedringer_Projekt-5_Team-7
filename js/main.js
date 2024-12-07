/* Funktionalitet til at åbne og lukke mobilmenu */

const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNav = document.getElementById('mobile-nav');

mobileNavToggle.addEventListener('click', () => {
    if (!mobileNav.classList.contains('main-nav-mobile--open')) {
        mobileNav.classList.add('main-nav-mobile--open');
        document.body.classList.add('body--no-scroll');
    }
});

mobileNavClose.addEventListener('click', () => {
    if (mobileNav.classList.contains('main-nav-mobile--open')) {
        mobileNav.classList.remove('main-nav-mobile--open');
        document.body.classList.remove('body--no-scroll');
    }
});

/* Tilføj baggrund på header ved scroll */

const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        mainHeader.classList.add('header--scrolled');
    } else {
        mainHeader.classList.remove('header--scrolled');
    }
});

/* Tilføj åbne- og lukkefunktion til FAQ */

const faqs = document.querySelectorAll('.faq');

faqs.forEach((faq) => {
    faq.children[0].addEventListener('click', () => {
        if (!faq.classList.contains('faq--open')) {
            faq.classList.add('faq--open');
        } else {
            faq.classList.remove('faq--open');
        }
    });
});