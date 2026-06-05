/**
 * TalentGrow Instructor Dashboard Engine
 * Handles real-time view swapping across categories with premium material assets.
 */

// Comprehensive Material Matrix Ecosystem
const HUB_DATABASE = {
  about: {
    title: "About the Instructor",
    isGridLayout: false,
    items: [
      {
        content: `<div class="about-text-panel">
          <p>Sarah Jenkins is a globally distinguished Staff Systems Architect and Tech Educator with over 12 years of hands-on technical architecture development at organizations like Google, Meta, and Netflix.</p>
          <p>At TalentGrow, Sarah leads system design optimization cohorts and career negotiation workshops specifically structured for developers striving to secure leadership, mid-tier, or tier-1 product firm placement offers.</p>
          <p>Her technical methodologies break down complex architectural patterns into highly digestible frameworks, while her strategic career playbooks have successfully guided thousands of software engineers in securing maximum compensations.</p>
        </div>`
      }
    ]
  },
  courses: {
    title: "Active Learning Cohorts",
    isGridLayout: true,
    items: [
      {
        title: "Mastering Distributed Systems Architecture",
        desc: "Deep dive into microservices, high-availability sharding pipelines, and fault-tolerant cloud engines.",
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        label: "60+ Hours Content",
        price: "₹149"
      },
      {
        title: "The Tech Interview Blueprint (MAANG Edition)",
        desc: "Advanced Algorithmic problems, complex data design paradigms, and targeted technical negotiation mockups.",
        img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
        label: "Top Choice Cohort",
        price: "₹199"
      }
    ]
  },
  notes: {
    title: "Curated Revision Notes & Blueprints",
    isGridLayout: true,
    items: [
      {
        title: "System Design Structural Cheatsheet v4",
        desc: "Visual workflow configurations detailing load balancers, caching logic layers, and replication models.",
        img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        label: "PDF Digital Asset",
        price: "₹12"
      },
      {
        title: "Data Structures & Patterns Cheat Compilation",
        desc: "Quick structural review patterns for graph mutations, sliding windows, and backtracking paradigms.",
        img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        label: "Handwritten Sync",
        price: "₹9"
      }
    ]
  },
  projects: {
    title: "Production-Grade Capstone Blueprints",
    isGridLayout: true,
    items: [
      {
        title: "E-Commerce Orchestration Service Engine",
        desc: "Build a distributed transactional checkout microservice capable of processing concurrent messaging.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        label: "Source Code Included",
        price: "₹39"
      }
    ]
  },
  podcasts: {
    title: "Career & Tech Leadership Audio Audio Sessions",
    isGridLayout: true,
    items: [
      {
        title: "Episode 45: Negotiating Your Stocks Without Counter-Offers",
        desc: "Sarah breaks down the psychology of corporate HR budget bands and equity valuation adjustments.",
        img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
        label: "Premium Audio Class",
        price: "₹15"
      }
    ]
  },
  books: {
    title: "Published Technical Books & Literature",
    isGridLayout: true,
    items: [
      { title: "Build Your Dream Network", desc: "Forging strategic professional networking ties inside modern corporate structures.", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" },
      { title: "Visible Learning for Literacy", desc: "Maximizing foundational knowledge pipelines for swift technical absorption.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" },
      { title: "The New Rules of Work", desc: "The definitive operational playbook for navigating professional shifts confidently.", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" },
      { title: "Pivot Career Frameworks", desc: "Smart architectural systems for strategic execution of career conversions.", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" },
      { title: "Learning & Development Insights", desc: "Practical optimization guidance for enterprise technology tracking.", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" },
      { title: "Visible Learning (Advanced Tracks)", desc: "Deep analytical studies surrounding system design instruction methodologies.", img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80", label: "All Benefits of PLUS", price: "$24" }
    ]
  },
  reviews: {
    title: "Student Success Testimonials",
    isGridLayout: false,
    items: [
      {
        content: `<div class="review-item-row">
          <div class="review-meta-line"><strong>Aman Sharma (Senior Engineer, Adobe)</strong> <span>⭐⭐⭐⭐⭐</span></div>
          <p>"Sarah's system design notes saved my interviews. I went from constant L4 failures to securing a solid L5 staff offer package within months!"</p>
        </div>`
      },
      {
        content: `<div class="review-item-row" style="margin-top:15px;">
          <div class="review-meta-line"><strong>Rohan Verma (Placement Fellow)</strong> <span>⭐⭐⭐⭐⭐</span></div>
          <p>"The books module structure matched exactly what I needed to design my outbound outreach strategy. Absolute class!"</p>
        </div>`
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderHubSection("about"); // Default initialization segment
  setupTabListeners();
  setupScrollReveal();
});

function setupTabListeners() {
  const tabs = document.querySelectorAll(".hub-tab-btn");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const targetKey = tab.getAttribute("data-target");
      renderHubSection(targetKey);
    });
  });
}

function renderHubSection(key) {
  const currentData = HUB_DATABASE[key];
  const titleContainer = document.getElementById("sectionDisplayTitle");
  const gridContainer = document.getElementById("hubDynamicGrid");
  const paginationContainer = document.getElementById("hubPagination");
  
  if (!currentData) return;
  
  // Set view title
  titleContainer.textContent = currentData.title;
  gridContainer.innerHTML = "";
  paginationContainer.innerHTML = "";
  
  // Adjust structural layout type class handles
  if (currentData.isGridLayout) {
    gridContainer.classList.remove("single-layout");
    
    // Inject cleanly structured dynamic materials
    currentData.items.forEach(item => {
      const cardHTML = `
        <div class="hub-material-card">
          <div class="card-media-box">
            <img src="${item.img}" alt="${item.title}">
          </div>
          <div class="card-info-content">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <div class="card-action-bar">
              <span class="card-action-label">${item.label}</span>
              <span class="card-action-price">${item.price}</span>
            </div>
          </div>
        </div>
      `;
      gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
    
    // If viewing books (matches image_fc3886.png layout), inject custom clean pagination component layout
    if (key === "books") {
      paginationContainer.innerHTML = `
        <button class="page-node-btn"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="page-node-btn">1</button>
        <button class="page-node-btn">2</button>
        <button class="page-node-btn active">3</button>
        <button class="page-node-btn">4</button>
        <button class="page-node-btn">5</button>
        <button class="page-node-btn"><i class="fa-solid fa-chevron-right"></i></button>
      `;
    }
    
  } else {
    // Single block raw content integration (About text / custom structured reviews layout rows)
    gridContainer.classList.add("single-layout");
    currentData.items.forEach(item => {
      gridContainer.insertAdjacentHTML("beforeend", item.content);
    });
  }
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  function triggerCheck() {
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < (window.innerHeight / 5) * 4.5) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", triggerCheck);
  triggerCheck();
}





const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        const visible = 100;

        if (top < window.innerHeight - visible) {
            item.classList.add("active");
        }
    });
});
