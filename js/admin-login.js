document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const input = document.getElementById("pinInput");
  const error = document.getElementById("errorMsg");

  btn.addEventListener("click", async () => {
    error.style.display = "none";

    const pin = input.value.trim();
    if (!pin) return;

    const res = await fetch("/.netlify/functions/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin })
    });

    if (res.ok) {
      window.location.href = "/admin-panel.html";
    } else {
      error.textContent = "Invalid or expired PIN";
      error.style.display = "block";
    }
  });
});
