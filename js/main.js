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


const instagramArray = Array.from(document.querySelectorAll('.ig-cards .ig-cards--overflow'));

let currentIndex = 0;

const previousbutton = document.getElementById('.n--arrowleft');
const nextbutton = document.getElementById('.n--arrowright');

function updateCarousel() {
    const track = document.querySelector('.ig-cards .ig-cards--overflow');
    const cardWidth = instagramArray[0].getBoundingClientRect().width + 10;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

previousbutton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextbutton.addEventListener('click', () => {
    if (currentIndex < instagramArray.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();