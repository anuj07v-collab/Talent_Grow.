/**
 * TALENT GROW PLATFORM ENGINE - PRODUCTION COMPLETE
 */

document.addEventListener("DOMContentLoaded", () => {
    // Invoke Data Render Loops
    hydrateCourseCatalogues();
    setupTestimonialTabs();
});

// Mock Database Storage for Accurate UI Content
const defaultCourseTitle = "AWS Certified solutions Architect";
const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

const platformImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1513258496099-48168024addd?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80"
];

/**
 * Builds 8 Cards for Main Grid & 8 Cards for Horizontal Carousel Scroller
 */
function hydrateCourseCatalogues() {
    const gridContainer = document.getElementById("main-course-grid");
    const scrollerContainer = document.getElementById("recommended-scroller");

    let completeCardsTemplate = "";

    // Exact structural template block iteration loop
    for (let i = 0; i < 8; i++) {
        const activeImage = platformImages[i % 4];
        
        completeCardsTemplate += `
        <div class="course-premium-card">
            <div class="card-media-header">
                <img src="${activeImage}" alt="Course Workspace Material">
            </div>
            <div class="card-inner-body">
                <div class="meta-tags-flex">
                    <span class="meta-tag"><i class="fa-solid fa-layer-group"></i> Design</span>
                    <span class="meta-tag"><i class="fa-regular fa-clock"></i> 3 Month</span>
                </div>
                <h3 class="course-title-text">${defaultCourseTitle}</h3>
                <p class="course-excerpt-desc">${descriptionText}</p>
                <div class="card-footer-profile-row">
                    <div class="author-meta-container">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Author Lina">
                        <span>Lina</span>
                    </div>
                    <div class="pricing-block">
                        <span class="strike-price">₹100</span>
                        <span class="current-price">₹80</span>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // Direct injection into DOM nodes securely
    if (gridContainer) gridContainer.innerHTML = completeCardsTemplate;
    if (scrollerContainer) scrollerContainer.innerHTML = completeCardsTemplate;
}

/**
 * Manages Testimonial Tab Engine Transitions smoothly
 */
function setupTestimonialTabs() {
    const avatarTabs = document.querySelectorAll(".stacked-avatar");
    const nameHeading = document.getElementById("live-student-name");
    const emailSub = document.getElementById("live-student-email");
    const textParagraph = document.getElementById("live-student-quote");
    const centerDisplayImage = document.getElementById("target-large-avatar");

    const alternateQuotes = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Excellent experience learning full-stack development here. The UI styling matches industry standards, and the response speed of instructors is microscopic and helpful.",
        "Highly recommended platform for freshers preparing for professional interviews. The modern dashboards and clean interactive tools keep you fully engaged daily.",
        "The best offers, deep insights, and direct hands-on support. Interactive states make tracking and reviewing content seamless and production-ready."
    ];

    avatarTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Remove active highlight from all elements
            avatarTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Apply smooth fade-out state before swapping data
            textParagraph.style.opacity = "0";
            centerDisplayImage.style.opacity = "0";

            setTimeout(() => {
                nameHeading.innerText = tab.getAttribute("data-name");
                emailSub.innerText = tab.getAttribute("data-email");
                centerDisplayImage.src = tab.getAttribute("data-img");
                textParagraph.innerText = alternateQuotes[index];

                // Fade back in smoothly
                textParagraph.style.opacity = "1";
                centerDisplayImage.style.opacity = "1";
            }, 220);
        });
    });
}
















/* =========================
   PAGE LOAD ANIMATION
========================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    const elements = document.querySelectorAll(
        ".course-premium-card, .creator-profile-card, .deal-overlay-card, .inner-promo-card, .unified-testimonial-container"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show-element");
                }

            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((el) => observer.observe(el));

});


/* =========================
   AUTO TESTIMONIAL SLIDER
========================= */

function autoRotateTestimonials() {

    const tabs = document.querySelectorAll(".stacked-avatar");

    if (!tabs.length) return;

    let current = 0;

    setInterval(() => {

        current++;

        if (current >= tabs.length) {
            current = 0;
        }

        tabs[current].click();

    }, 4000);
}

autoRotateTestimonials();


/* =========================
   HERO FADE IN
========================= */

const hero = document.querySelector(".hero-wrapper");

if(hero){

    hero.style.opacity="0";
    hero.style.transform="translateY(50px)";

    setTimeout(()=>{

        hero.style.transition="all 1s ease";
        hero.style.opacity="1";
        hero.style.transform="translateY(0)";

    },300);

}