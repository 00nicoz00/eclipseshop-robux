function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "RSA4@7L9!@r") {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    alert("Wrong credentials");
  }
}
