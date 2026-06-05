/**
 * TalentGrow Student Workspace Engine
 * Features: Live Doubt Raising Simulation, Dynamic Workspace Switching, Mobile Navigation.
 */

// 1. Initial Local Tickets Database Setup
let MY_DOUBT_TICKETS = [
  { id: 901, topic: "CSS Grid Row Alignment Issue", date: "Today", status: "Awaiting Instructor Review" },
  { id: 902, topic: "Pandas DataFrame Dropna Syntax", date: "Yesterday", status: "Resolved by Instructor" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderDoubtTickets();
  initTabRoutingEngine();
  initDoubtSubmission();
  initMobileResponsiveToggle();
});

/* ==========================================================================
   2. RENDER ACTIVE DOUBT TIMELINE LOGS
   ========================================================================== */
function renderDoubtTickets() {
  const container = document.getElementById("studentTicketsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (MY_DOUBT_TICKETS.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem; color:#64748b; text-align:center; padding:15px;">You have no raised doubt records.</p>`;
    return;
  }

  MY_DOUBT_TICKETS.forEach(ticket => {
    // Dynamic status color calculation
    const isResolved = ticket.status.toLowerCase().includes("resolved");
    const statusColor = isResolved ? "#10b981" : "#f59e0b";

    const nodeHtml = `
      <div class="ticket-status-node">
        <h5>
          <span>${ticket.topic}</span>
          <span style="color: ${statusColor}; font-size:0.75rem;"><i class="fa-solid fa-circle-dot"></i> ${ticket.status}</span>
        </h5>
        <p>Logged Date: ${ticket.date} • Ticket ID: #TG-DB-${ticket.id}</p>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", nodeHtml);
  });
}

/* ==========================================================================
   3. INJECT NEW DOUBT TICKETS REAL-TIME
   ========================================================================== */
function initDoubtSubmission() {
  const form = document.getElementById("raiseDoubtForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const topicInput = document.getElementById("doubtTopic").value.trim();
    const snippetInput = document.getElementById("doubtSnippet").value.trim();

    if (!topicInput || !snippetInput) return;

    // Build new active dictionary node element
    const newTicket = {
      id: Math.floor(Math.random() * 900) + 100,
      topic: topicInput,
      date: "Just Now",
      status: "Awaiting Instructor Review"
    };

    MY_DOUBT_TICKETS.unshift(newTicket);
    renderDoubtTickets();

    alert("Success! Your code query ticket has been dispatched into the Instructor pipeline queue.");
    form.reset();
  });
}

/* ==========================================================================
   4. CENTRALIZED WORKSPACE TAB ROUTER
   ========================================================================== */
function initTabRoutingEngine() {
  const menuItems = document.querySelectorAll(".menu-item");
  
  const overviewSection = document.getElementById("overviewSection");
  const assignmentsSection = document.getElementById("assignmentsSection");
  const doubtsSection = document.getElementById("doubtsSection");

  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const routingKey = item.getAttribute("data-tab");

      // Reset layout views
      if (overviewSection) overviewSection.style.display = "none";
      if (assignmentsSection) assignmentsSection.style.display = "none";
      if (doubtsSection) doubtsSection.style.display = "none";

      // Toggle targeted structural layout engine views
      if (routingKey === "overview") {
        if (overviewSection) overviewSection.style.display = "block";
      } else if (routingKey === "assignments") {
        if (assignmentsSection) assignmentsSection.style.display = "block";
      } else if (routingKey === "doubts") {
        if (doubtsSection) doubtsSection.style.display = "block";
      }

      // Responsive fallback behavior to collapse active drawer
      const sidebar = document.getElementById("studentSidebar");
      if (sidebar) sidebar.classList.remove("open");
    });
  });
}

/* ==========================================================================
   5. MOBILE HAMBURGER TOGGLES
   ========================================================================== */
function initMobileResponsiveToggle() {
  const toggleBtn = document.getElementById("mobileToggleBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  const sidebar = document.getElementById("studentSidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => sidebar.classList.add("open"));
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
  }
}