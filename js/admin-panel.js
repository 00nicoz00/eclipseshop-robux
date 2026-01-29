if (sessionStorage.getItem("admin") !== "true") {
  window.location.href = "/admin";
}

function logout() {
  sessionStorage.removeItem("admin");
  window.location.href = "/admin";
}
