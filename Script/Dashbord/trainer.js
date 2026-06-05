/**
 * TalentGrow Trainer Console Management Engine
 * Features: Live Doubt Resolving, Assignment Auditing, Scheduling Modals & View Routing.
 */

// 1. Live Performance Databases Matrix
let DOUBT_TICKETS = [
  { id: 401, student: "Amit Mishra", topic: "Docker Container Networking Faults", snippet: "Error: connect ECONNREFUSED 127.0.0.1:3306 inside docker-compose bridge config setup." },
  { id: 402, student: "Sneha Rao", topic: "Redux State Over-rendering", snippet: "useEffect dependency loops causing constant state updates in cart application view." },
  { id: 403, student: "Karan Johar", topic: "JWT Verification Middlewares", snippet: "Token validation logic dropping payload contexts during cross-origin routing checks." }
];

let ASSIGNMENT_SUBMISSIONS = [
  { id: 701, student: "Vikram Malhotra", topic: "Redis Cache Layer Setup", date: "2026-06-01", repo: "https://github.com/example/redis-layer" },
  { id: 702, student: "Divya Teja", topic: "Tailwind Component Design Layout", date: "2026-05-31", repo: "https://github.com/example/tailwind-hub" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderDoubtTickets();
  renderAssignmentsTable();
  initTabSwitcher();
  initModalEngine();
  initMobileToggle();
});

/* ==========================================================================
   2. LIVE DOUBTS HUB RENDERER
   ========================================================================== */
function renderDoubtTickets() {
  const container = document.getElementById("doubtsListContainer");
  const badge = document.getElementById("doubtCountBadge");
  
  if (!container) return;
  container.innerHTML = "";
  
  if (badge) badge.textContent = DOUBT_TICKETS.length;

  if (DOUBT_TICKETS.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#64748b;">
        <i class="fa-solid fa-circle-check" style="font-size:2.5rem; color:#10b981; margin-bottom:10px;"></i>
        <p>Excellent work! All pending student query logs are currently resolved.</p>
      </div>`;
    return;
  }

  DOUBT_TICKETS.forEach(ticket => {
    const cardHtml = `
      <div class="doubt-node-card" id="ticket-node-${ticket.id}">
        <div class="doubt-meta-info">
          <h4>${ticket.topic}</h4>
          <p>Raised By: <strong>${ticket.student}</strong> • Pending Callback</p>
          <div class="doubt-text-snippet"><code>${ticket.snippet}</code></div>
        </div>
        <button class="price-btn solid" onclick="resolveTicket(${ticket.id})">
          <i class="fa-solid fa-envelope-open-text"></i> Mark Resolved
        </button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHtml);
  });
}

window.resolveTicket = function(id) {
  // Animate and clear resolved ticket from view array instantly
  DOUBT_TICKETS = DOUBT_TICKETS.filter(t => t.id !== id);
  renderDoubtTickets();
};

/* ==========================================================================
   3. CAPSTONE ASSIGNMENT EVALUATOR BLOCK
   ========================================================================== */
function renderAssignmentsTable() {
  const tbody = document.getElementById("assignmentTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (ASSIGNMENT_SUBMISSIONS.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#64748b;">No outstanding student projects awaiting grading records.</td></tr>`;
    return;
  }

  ASSIGNMENT_SUBMISSIONS.forEach(item => {
    const rowHtml = `
      <tr id="assignment-row-${item.id}">
        <td><strong>${item.student}</strong></td>
        <td>${item.topic}</td>
        <td>${item.date}</td>
        <td><a href="${item.repo}" target="_blank" class="repo-link"><i class="fa-brands fa-github"></i> View Repo</a></td>
        <td>
          <button class="price-btn solid" style="padding:6px 12px; font-size:0.75rem; background:#10b981;" onclick="gradeSubmission(${item.id}, 'Approved')">Approve</button>
          <button class="price-btn outline" style="padding:6px 12px; font-size:0.75rem; color:#ef4444;" onclick="gradeSubmission(${item.id}, 'Rejected')">Reject</button>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", rowHtml);
  });
}

window.gradeSubmission = function(id, status) {
  alert(`Assignment Record #${id} has been marked as: ${status}`);
  ASSIGNMENT_SUBMISSIONS = ASSIGNMENT_SUBMISSIONS.filter(a => a.id !== id);
  renderAssignmentsTable();
};

/* ==========================================================================
   4. SCHEDULING ENGINE MODAL DIALOGS
   ========================================================================== */
function initModalEngine() {
  const modal = document.getElementById("liveClassModal");
  const triggerBtn = document.getElementById("scheduleClassBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const closeX = document.getElementById("modalCloseX");
  const form = document.getElementById("liveClassForm");

  if (!modal || !triggerBtn) return;

  triggerBtn.addEventListener("click", () => modal.classList.add("open"));
  
  const hideModal = () => modal.classList.remove("open");
  closeBtn.addEventListener("click", hideModal);
  closeX.addEventListener("click", hideModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("sessionTitle").value;
    const time = document.getElementById("sessionTime").value;
    
    alert(`Success! Broadcast pipeline active. Meeting Link initialized for session:\n"${title}" at ${time}.`);
    form.reset();
    hideModal();
  });
}

/* ==========================================================================
   5. WORKSPACE TAB COMPONENT SWITCH ROUTER
   ========================================================================== */
function initTabSwitcher() {
  const tabs = document.querySelectorAll(".menu-item");
  const doubtsSection = document.getElementById("doubtsSection");
  const assignmentsSection = document.getElementById("assignmentsSection");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const tabKey = tab.getAttribute("data-tab");

      if (tabKey === "overview" || tabKey === "doubts") {
        if (doubtsSection) doubtsSection.style.display = "block";
        if (assignmentsSection) assignmentsSection.style.display = "none";
      } else if (tabKey === "assignments") {
        if (doubtsSection) doubtsSection.style.display = "none";
        if (assignmentsSection) assignmentsSection.style.display = "block";
      }
      
      // Responsive safe auto-collapse
      document.getElementById("trainerSidebar").classList.remove("open");
    });
  });
}

/* ==========================================================================
   6. RESPONSIVE COMPONENT CONTROLS
   ========================================================================== */
function initMobileToggle() {
  const toggleBtn = document.getElementById("mobileToggleBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  const sidebar = document.getElementById("trainerSidebar");

  if (toggleBtn) toggleBtn.addEventListener("click", () => sidebar.classList.add("open"));
  if (closeBtn) closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
}