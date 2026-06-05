/**
 * TalentGrow Blog Engine - Core Interactions
 * Handles: Category Filtering, Live Search, Load More Simulation, 
 * Newsletter Submissions, and Scroll Reveal Animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all system components
  initCategoryFilters();
  initSearchEngine();
  initLoadMore();
  initNewsletterForm();
  initScrollReveal();
});

/* ==========================================================================
   1. CATEGORY FILTER SYSTEM
   ========================================================================== */


document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = parseFloat(counter.getAttribute("data-target"));
        const isDecimal = target % 1 !== 0;

        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 20;

        const increment = target / (duration / stepTime);

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                if (counter.classList.contains("rating")) {
                    counter.innerHTML = target + "★";
                } else if (target >= 1000) {
                    counter.innerHTML = (target / 1000) + "K+";
                } else {
                    counter.innerHTML = target + "+";
                }

                return;
            }

            if (counter.classList.contains("rating")) {
                counter.innerHTML = current.toFixed(1) + "★";
            } else {
                counter.innerHTML = Math.floor(current);
            }

            setTimeout(updateCounter, stepTime);
        };

        updateCounter();
    });

});








   
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-pill");
  const blogCards = document.querySelectorAll(".custom-blog-card");
  const featuredSection = document.querySelector(".featured-section");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all pills and assign to clicked one
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedFilter = button.getAttribute("data-filter");

      // Toggle Featured Section visibility (only show on 'All Stories')
      if (featuredSection) {
        if (selectedFilter === "all") {
          featuredSection.style.display = "block";
        } else {
          featuredSection.style.display = "none";
        }
      }

      // Filter grid cards
      blogCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        
        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          card.style.display = "flex";
          // Retrigger a subtle scale entry
          card.style.animation = "fadeInScale 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   2. LIVE SEARCH ENGINE
   ========================================================================== */
function initSearchEngine() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".hero-search-box .btn-cta");
  const blogCards = document.querySelectorAll(".custom-blog-card");

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    blogCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      const category = card.querySelector(".category-indicator").textContent.toLowerCase();

      if (title.includes(query) || description.includes(query) || category.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) {
    // Search on keyup (Live typing search)
    searchInput.addEventListener("keyup", performSearch);
  }
  if (searchBtn) {
    // Search on button click
    searchBtn.addEventListener("click", performSearch);
  }
}

/* ==========================================================================
   3. LOAD MORE SIMULATION
   ========================================================================== */
function initLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const blogGrid = document.querySelector(".blog-grid-system");

  // Premium mock database structure to inject fresh material seamlessly
  const mockNewBlogs = [
    {
      category: "tech",
      indicator: "Tech & Coding",
      img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80",
      title: "Mastering Docker & Kubernetes for Freshers",
      desc: "An absolute beginner-friendly operational breakdown of containerization and orchestration architectures."
    },
    {
      category: "placement",
      indicator: "Placement Tips",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      title: "Cracking Startup Hiring vs Corporate Hiring",
      desc: "Understand what agile business modules evaluate versus rigid tech assessment pipelines."
    }
  ];

  if (loadMoreBtn && blogGrid) {
    loadMoreBtn.addEventListener("click", () => {
      // Update state style to visual processing status
      loadMoreBtn.textContent = "Loading Awesome Content...";
      loadMoreBtn.style.opacity = "0.7";
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        mockNewBlogs.forEach((item) => {
          // Construct premium semantic structure dynamically
          const cardHtml = `
            <div class="custom-blog-card" data-category="${item.category}" style="animation: fadeInScale 0.4s ease forwards">
              <div class="card-img-mask">
                <img src="${item.img}" alt="${item.title}" />
              </div>
              <div class="card-body-info">
                <span class="category-indicator">${item.indicator}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="card-footer-action">
                  <button class="price-btn outline">Read More</button>
                </div>
              </div>
            </div>
          `;
          blogGrid.insertAdjacentHTML("beforeend", cardHtml);
        });

        // Hide structural button element once execution cycles completely
        loadMoreBtn.style.display = "none";
      }, 1200); // 1.2 Second crisp response delay window
    });
  }
}

/* ==========================================================================
   4. NEWSLETTER INTERACTION MODULE
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      const submitBtn = form.querySelector(".banner-btn");

      if (emailInput && emailInput.value) {
        // Change visual presentation states instantly
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Subscribed!';
        submitBtn.style.backgroundColor = "#10b981"; // Vibrant secure green accent
        emailInput.disabled = true;
        
        alert(`Welcome Aboard! Placement transcripts and resources successfully queued for: ${emailInput.value}`);
        form.reset();
      }
    });
  }
}

/* ==========================================================================
   5. PROJECT INTEGRATED SCROLL REVEAL TIMING LOOP
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    const triggerBottom = (window.innerHeight / 5) * 4.2; // Optimized entry trigger logic window

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  }

  // Bind interface scroll listener routines
  window.addEventListener("scroll", checkReveal);
  // Initial processing trigger immediately on load state configurations
  checkReveal();
}