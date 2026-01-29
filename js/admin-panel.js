if (localStorage.getItem("adminAuth") !== "true") {
  window.location.href = "/admin.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminAuth");
  window.location.href = "/admin.html";
});
