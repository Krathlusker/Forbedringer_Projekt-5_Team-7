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