document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 600) return 1;
        if (width <= 992) return 2;
        return 3;
    }

    function updateCarouselPosition() {
        const cards = document.querySelectorAll('.welcome-card');
        const totalCards = cards.length;
        const cardsPerView = getCardsPerView();
        const maxIndex = totalCards - cardsPerView;

        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 24; 
        
        const amountToMove = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const totalCards = document.querySelectorAll('.welcome-card').length;
        const maxIndex = totalCards - getCardsPerView();
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateCarouselPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = document.querySelectorAll('.welcome-card').length - getCardsPerView();
        }
        updateCarouselPosition();
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarouselPosition, 100);
    });
});

























document.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(
        ".course-card,.category-card,.welcome-card,.hero-section,.banner-section"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });

});
