if (localStorage.getItem("admin-auth") !== "true") {
  location.href = "/admin.html";
}

function logout() {
  localStorage.removeItem("admin-auth");
  location.href = "/admin.html";
}
