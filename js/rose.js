const carousel = document.querySelector('.r--cards');
const cards = carousel.querySelectorAll('.card');
const leftArrow = document.getElementById('r--leftarrow');
const rightArrow = document.getElementById('r--rightarrow');

let currentPosition = 0;

const cardWidth = cards[0].getBoundingClientRect().width; // Bredden af hvert kort
const cardGap = 30;
const carouselWidth = carousel.getBoundingClientRect().width; // Bredden af hele karrusellen
const maxPosition = -(cards.length * cardWidth - carouselWidth); // Maksimal negativ position


//venstre pil
leftArrow.addEventListener('click', () => {
    if (currentPosition >= 0) {
        currentPosition = 0;
    } else {
        currentPosition = currentPosition + cardWidth + cardGap;
        for (let index = 0; index < cards.length; index++) {
            cards[index].style.transform = "translateX(" + (currentPosition) + "px)";
        }
    }
});


//højre pil
rightArrow.addEventListener('click', () => {
    if (currentPosition < maxPosition) {
        currentPosition = maxPosition;
    } else {
        currentPosition = currentPosition - cardWidth - cardGap;
        for (let index = 0; index < cards.length; index++) {
        cards[index].style.transform = "translateX(" + (currentPosition) + "px)";
        }
    }   
});
