async function loadComponent(id, file) {
  const el = document.getElementById(id);

  // IMPORTANT FIX
  if (!el) {
    console.error("Element not found:", id);
    return;
  }

  try {
    const res = await fetch(file);

    if (!res.ok) {
      throw new Error("File not found: " + file);
    }

    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error("Load error:", err);
  }
}

// IMPORTANT CALL
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "./components/Navbar_B.html");
  loadComponent("footer", "./components/footer.html");
});
