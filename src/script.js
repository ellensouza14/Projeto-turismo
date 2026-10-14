const track = document.querySelector('.carrosel-track');
const slides = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const container = track.parentElement; 

let currentIndex = 0;


function getCarouselMetrics() {
    let slideDistance = slides[0].getBoundingClientRect().width;

    if (slides.length > 1) {
        slideDistance = slides[1].offsetLeft - slides[0].offsetLeft;
    }

    const containerWidth = container.getBoundingClientRect().width;

    const visibleSlides = Math.floor(containerWidth / slideDistance);

    const maxIndex = Math.max(0, slides.length - visibleSlides);

    return { slideDistance, maxIndex };
}


function updateCarousel() {
    if (slides.length === 0) return; 

    const { slideDistance, maxIndex } = getCarouselMetrics();
    
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex
    }

    track.style.transform = `translateX(-${currentIndex * slideDistance}px)`;

}


nextButton.addEventListener('click', () => {
    const { maxIndex } = getCarouselMetrics();

    currentIndex++;

    if (currentIndex > maxIndex) {
        currentIndex = 0;
    }

    updateCarousel();
});


prevButton.addEventListener('click', () => {
    const { maxIndex } = getCarouselMetrics();
    
    currentIndex--;
    
    if (currentIndex < 0) {
        currentIndex = maxIndex;
    }
    
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);


updateCarousel();