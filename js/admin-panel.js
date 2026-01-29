if (localStorage.getItem("admin-auth") !== "true") {
  window.location.href = "/admin.html";
}


function logout() {
  sessionStorage.removeItem("admin");
  window.location.href = "/admin";
}
