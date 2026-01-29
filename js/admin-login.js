const btn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

btn.addEventListener("click", async () => {
  msg.textContent = "";

  const res = await fetch("/.netlify/functions/generate-pin");
  const data = await res.json();

  const inputPin = document.getElementById("pinInput").value;

  if (inputPin === data.pin && Date.now() < data.expiresAt) {
    sessionStorage.setItem("admin", "true");
    window.location.href = "/admin-panel.html";
  } else {
    msg.textContent = "Invalid or expired PIN";
  }
});
