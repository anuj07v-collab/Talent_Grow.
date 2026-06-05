/**
 * TalentGrow Centralized Operations - Admin Dashboard Engine (v2.1 Complete)
 * Features: Live Data Injection, Search Engine Filters, Dynamic Financial Calculations, Course Catalogs & Mobile Menu.
 */

// 1. Core Structural Database Registries
let STUDENT_REGISTRY = [
  { id: 1, name: "Rahul Sharma", course: "Python Web Development", date: "2026-05-28", status: "Paid", fee: 4500 },
  { id: 2, name: "Priya Patel", course: "System Design Masterclass", date: "2026-05-30", status: "Pending", fee: 8500 },
  { id: 3, name: "Amit Verma", course: "UI/UX Styling with Tailwind", date: "2026-06-01", status: "Paid", fee: 3500 },
  { id: 4, name: "Sneha Reddy", course: "System Design Masterclass", date: "2026-06-01", status: "Paid", fee: 8500 }
];

let COURSE_CATALOG = [
  { id: 101, title: "Python Web Development", students: 42, price: "₹4,500", icon: "fa-brands fa-python" },
  { id: 102, title: "System Design Masterclass", students: 18, price: "₹8,500", icon: "fa-solid fa-network-wired" },
  { id: 103, title: "UI/UX Styling with Tailwind", students: 31, price: "₹3,500", icon: "fa-brands fa-css3-alt" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Sync view modules cleanly on load configurations
  renderStudentTable(STUDENT_REGISTRY);
  renderCourseCatalog();
  updateFinancialCounters();
  
  initDashboardSearch();
  initModalEngine();
  initTabNavigation();
  initMobileResponsiveMenu();
});

/* ==========================================================================
   2. RE-INDEX TABLES & REVENUE CALCULATOR
   ========================================================================== */
function updateFinancialCounters() {
  const totalStudentsCount = document.getElementById("totalStudentsCount");
  const totalRevenueCount = document.getElementById("totalRevenueCount");
  
  if (totalStudentsCount) totalStudentsCount.textContent = STUDENT_REGISTRY.length;
  
  // Real-time loop to map valid active paid registers balances
  let totalRevenue = STUDENT_REGISTRY.reduce((acc, current) => {
    return current.status === "Paid" ? acc + current.fee : acc;
  }, 320000); // Base revenue seed mockup data factor
  
  if (totalRevenueCount) {
    totalRevenueCount.textContent = "₹" + totalRevenue.toLocaleString('en-IN');
  }
}

function renderStudentTable(dataList) {
  const tableBody = document.getElementById("studentTableBody");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  if (dataList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: #64748b; padding: 35px;">No corresponding structural entry rows matched.</td></tr>`;
    return;
  }

  dataList.forEach(student => {
    const statusClass = student.status.toLowerCase() === "paid" ? "paid" : "pending";
    
    const rowHtml = `
      <tr id="student-row-${student.id}">
        <td><strong>${student.name}</strong></td>
        <td>${student.course}</td>
        <td>${student.date}</td>
        <td><span class="status-chip ${statusClass}">${student.status}</span></td>
        <td>
          <button class="action-icon-btn delete" onclick="deleteStudent(${student.id})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", rowHtml);
  });
}

/* ==========================================================================
   3. COURSE CATALOG MANAGER INJECTION
   ========================================================================== */
function renderCourseCatalog() {
  const courseGrid = document.getElementById("courseAdminGrid");
  const activeCoursesCount = document.getElementById("activeCoursesCount");
  
  if (!courseGrid) return;
  courseGrid.innerHTML = "";
  
  if (activeCoursesCount) activeCoursesCount.textContent = COURSE_CATALOG.length;

  COURSE_CATALOG.forEach(course => {
    const cardHtml = `
      <div class="stat-card" style="flex-direction: column; align-items: flex-start; gap: 15px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
          <div class="stat-icon primary"><i class="${course.icon}"></i></div>
          <span style="font-size: 0.8rem; font-weight: 600; color: #49bcbc; background: rgba(73,188,188,0.08); padding: 5px 12px; border-radius: 6px;">
            ${course.students} Enrolled
          </span>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; color: #0d1425;">${course.title}</h4>
          <p style="font-size: 1.15rem; font-weight: 700; color: #49bcbc;">${course.price}</p>
        </div>
      </div>
    `;
    courseGrid.insertAdjacentHTML("beforeend", cardHtml);
  });
}

/* ==========================================================================
   4. MODAL DIALOG ENTRY HANDLER & MUTATION ACTIONS
   ========================================================================== */
window.deleteStudent = function(id) {
  if (confirm("Are you sure you want to permanently clear this record entry?")) {
    STUDENT_REGISTRY = STUDENT_REGISTRY.filter(student => student.id !== id);
    renderStudentTable(STUDENT_REGISTRY);
    updateFinancialCounters();
  }
};

function initModalEngine() {
  const modal = document.getElementById("studentModal");
  const addBtn = document.getElementById("addStudentBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const closeX = document.getElementById("modalCloseX");
  const form = document.getElementById("studentForm");

  if (!modal || !addBtn) return;

  const openModal = () => modal.classList.add("open");
  const closeModal = () => modal.classList.remove("open");

  addBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  closeX.addEventListener("click", closeModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("modalStudentName").value.trim();
    const course = document.getElementById("modalStudentCourse").value;
    const status = document.getElementById("modalStudentStatus").value;
    const today = new Date().toISOString().split('T')[0];

    // Evaluate mapped static balance configurations pricing
    let dynamicFee = 4500;
    if (course.includes("System Design")) dynamicFee = 8500;
    if (course.includes("Tailwind")) dynamicFee = 3500;

    const entryRecord = {
      id: Date.now(),
      name: name,
      course: course,
      date: today,
      status: status,
      fee: dynamicFee
    };

    STUDENT_REGISTRY.unshift(entryRecord);
    renderStudentTable(STUDENT_REGISTRY);
    updateFinancialCounters();
    
    form.reset();
    closeModal();
  });
}

/* ==========================================================================
   5. LIVE FILTER QUERY ENGINE
   ========================================================================== */
function initDashboardSearch() {
  const searchInput = document.getElementById("dashboardSearch");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.toLowerCase().trim();
    const matches = STUDENT_REGISTRY.filter(student => {
      return student.name.toLowerCase().includes(query) || 
             student.course.toLowerCase().includes(query) ||
             student.status.toLowerCase().includes(query);
    });
    renderStudentTable(matches);
  });
}

/* ==========================================================================
   6. INTERACTIVE TAB ROUTER LINKAGE
   ========================================================================== */
function initTabNavigation() {
  const tabs = document.querySelectorAll(".menu-item");
  const studentsSection = document.getElementById("studentsSection");
  const coursesSection = document.getElementById("coursesSection");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const routingKey = tab.getAttribute("data-tab");

      if (routingKey === "overview" || routingKey === "students") {
        if (studentsSection) studentsSection.style.display = "block";
        if (coursesSection) coursesSection.style.display = "none";
      } else if (routingKey === "courses") {
        if (studentsSection) studentsSection.style.display = "none";
        if (coursesSection) coursesSection.style.display = "block";
      }
      
      // Auto-collapse sidebar upon clicking items on responsive devices
      const sidebar = document.getElementById("dashboardSidebar");
      if (sidebar) sidebar.classList.remove("open");
    });
  });
}

/* ==========================================================================
   7. MOBILE RESPONSIVE HAMBURGER NAVIGATION
   ========================================================================== */
function initMobileResponsiveMenu() {
  const toggleBtn = document.getElementById("mobileToggleBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  const sidebar = document.getElementById("dashboardSidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => sidebar.classList.add("open"));
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => sidebar.classList.remove("open"));
  }
}