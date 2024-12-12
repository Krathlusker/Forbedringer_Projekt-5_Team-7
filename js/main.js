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

/* Karrusel-funktionalitet til inspirations-cards på forsiden (JANNICK) */

if (document.querySelectorAll('.j--cards')) {
    const jCarouselCards = document.querySelectorAll('.j--cards');

    for (let i = 0; i < jCarouselCards.length; i++) {
        const jPaginationPrev = jCarouselCards[i].nextElementSibling.querySelector('.j--pagination-prev');
        const jPaginationNext = jCarouselCards[i].nextElementSibling.querySelector('.j--pagination-next');
        const jCarouselCard = document.querySelectorAll('.j--card-and-testimonial');
        let cardCount = jCarouselCard.length;
        let cardsInView;

        window.addEventListener('resize', () => {
            jCarouselReset(jCarouselCard);
        });

        if (window.innerWidth < 600) {
            cardsInView = 1;
        } else if (window.innerWidth >= 600 && window.innerWidth < 840) {
            cardsInView = 2;
        } else {
            cardsInView = 3;
        }

        jPaginationPrev.addEventListener('click', () => {
            jCarouselPrev(jCarouselCards[i], jCarouselCard);
        });

        jPaginationNext.addEventListener('click', () => {
            jCarouselNext(jCarouselCards[i], jCarouselCard, cardCount, cardsInView);
        });
    }
}

function jCarouselReset(carouselCard) {
    for (let i = 0; i < carouselCard.length; i++) {
        carouselCard[i].style.transform = "translateX(0px)";
    }
}

function jCarouselPrev(carousel, carouselCard) {
    let carouselX = carousel.getBoundingClientRect().x;
    let cardX = carouselCard[0].getBoundingClientRect().x;
    let cardWidth = carouselCard[0].getBoundingClientRect().width;
    let cardGap = carouselCard[1].getBoundingClientRect().x - cardX - cardWidth;
    let currentPos = cardX - carouselX;
    if (currentPos >= -1) {
        currentPos = 0;
    } else {
        for (let i = 0; i < carouselCard.length; i++) {
            carouselCard[i].style.transform = "translateX(" + (currentPos + cardWidth + cardGap) + "px)";
        }
    }
}

function jCarouselNext(carousel, carouselCard, count, inView) {
    let carouselX = carousel.getBoundingClientRect().x;
    let cardX = carouselCard[0].getBoundingClientRect().x;
    let cardWidth = carouselCard[0].getBoundingClientRect().width;
    let cardGap = carouselCard[1].getBoundingClientRect().x - cardX - cardWidth;
    let allCardsWidth = (cardWidth + cardGap) * count - cardGap;
    let currentPos = cardX - carouselX;
    if (currentPos < ((allCardsWidth - (cardWidth + cardGap) * (inView)) * -1)) {
        currentPos = allCardsWidth;
    } else {
        for (let i = 0; i < carouselCard.length; i++) {
            carouselCard[i].style.transform = "translateX(" + (currentPos - cardWidth - cardGap) + "px)";
        }
    }
}

if (document.querySelector('.ig-card')) { // Tjek, om .ig-card findes på den pågældende side -- If-statement tilføjet af Jannick

    //Start på Nikolaj afsnit//

    const instagramArray = Array.from(document.querySelectorAll('.ig-card'));

    let currentIndex = 0;

    const previousbutton = document.getElementById('n--arrowleft');
    const nextbutton = document.getElementById('n--arrowright');

    function updateCarousel() {
        const cardWidth = instagramArray[0].getBoundingClientRect().width;
        const cardGap = instagramArray[1].getBoundingClientRect().x 
        - instagramArray[0].getBoundingClientRect().x - cardWidth;
    

        for (let i = 0; i < instagramArray.length; i++) {
            instagramArray[i].style.transform = `translateX(${currentIndex * (cardWidth + cardGap) * -1}px)`
            instagramArray[i].style.transition = 'transform 0.3s ease';
        }
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

    //Slut på Nikolaj afsnit//

}