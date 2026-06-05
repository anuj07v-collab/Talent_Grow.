document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. SCROLL REVEAL / SLIDE-IN OPENING ENGINE
    // ==========================================================================
    const revealElements = document.querySelectorAll(".reveal");

    const handleScrollReveal = () => {
        const triggerPoint = window.innerHeight * 0.85; // Animates when 85% of element is in viewport
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                el.classList.add("active");
            }
        });
    };

    // Trigger instantly for components visible on load
    setTimeout(handleScrollReveal, 100);
    window.addEventListener("scroll", handleScrollReveal);


    // ==========================================================================
    // 2. FAQ ACCORDION FUNCTIONALITY
    // ==========================================================================
    const accordions = document.querySelectorAll(".accordion-item");

    accordions.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const body = item.querySelector(".accordion-body");
        
        // Safely map pre-activated elements on initialization
        if (item.classList.contains("active")) {
            body.style.maxHeight = body.scrollHeight + "px";
        }

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all other items (Pure Accordion Mode)
            accordions.forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-body").style.maxHeight = null;
            });

            // Toggle current item state
            if (!isActive) {
                item.classList.add("active");
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });


    // ==========================================================================
    // 3. REVIEWS SLIDER CAROUSEL ENGINE
    // ==========================================================================
    const track = document.getElementById("reviewTrack");
    const prevBtn = document.getElementById("prevReview");
    const nextBtn = document.getElementById("nextReview");

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        const getResponsiveSlidesPerPage = () => {
            if (window.innerWidth <= 640) return 1;
            if (window.innerWidth <= 968) return 2;
            return 3; // Desktop
        };

        const shiftSlider = () => {
            const card = track.querySelector(".review-card");
            if (!card) return;
            
            const cardWidth = card.getBoundingClientRect().width;
            const styleGap = 24; // Matches CSS gaps
            
            track.style.transform = `translateX(-${currentIndex * (cardWidth + styleGap)}px)`;
        };

        nextBtn.addEventListener("click", () => {
            const cardsCount = track.querySelectorAll(".review-card").length;
            const slidesPerPage = getResponsiveSlidesPerPage();

            if (currentIndex < cardsCount - slidesPerPage) {
                currentIndex++;
            } else {
                currentIndex = 0; // Infinite looping feature
            }
            shiftSlider();
        });

        prevBtn.addEventListener("click", () => {
            const cardsCount = track.querySelectorAll(".review-card").length;
            const slidesPerPage = getResponsiveSlidesPerPage();

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cardsCount - slidesPerPage; // Shifting back to terminal end
            }
            shiftSlider();
        });

        // Recalculate dynamic dimensions on window layout updates
        window.addEventListener("resize", () => {
            currentIndex = 0;
            shiftSlider();
            
            // Re-render active accordion expanded frames cleanly
            accordions.forEach(item => {
                if (item.classList.contains("active")) {
                    item.querySelector(".accordion-body").style.maxHeight = 
                        item.querySelector(".accordion-body").scrollHeight + "px";
                }
            });
        });
    }
});