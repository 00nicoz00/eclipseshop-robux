// ===============================
// ADMIN PANEL AUTH GUARD
// ===============================
(function () {
  const isAuth = localStorage.getItem("admin-auth");

  if (isAuth !== "true") {
    // non loggato → torna al login
    window.location.href = "/admin.html";
    return;
  }
})();

// ===============================
// LOGOUT BUTTON (opzionale)
// ===============================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("admin-auth");
    window.location.href = "/admin.html";
  });
}

// ===============================
// ESEMPIO FUNZIONI ADMIN
// ===============================

// esempio: mostra username admin
const adminLabel = document.getElementById("adminStatus");
if (adminLabel) {
  adminLabel.textContent = "Logged in as Admin";
}

// esempio: azione admin
const testBtn = document.getElementById("testAction");
if (testBtn) {
  testBtn.addEventListener("click", () => {
    alert("Admin action executed ✅");
  });
}
