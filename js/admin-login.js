// /js/admin-login.js

document.getElementById("loginBtn").addEventListener("click", async () => {
  const pin = document.getElementById("pinInput").value;
  const error = document.getElementById("errorMsg");

  error.style.display = "none";

  try {
    const res = await fetch("/.netlify/functions/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin })
    });

    const data = await res.json();

    if (data.ok) {
      window.location.href = "/admin-panel";
    } else {
      error.textContent = "Invalid or expired PIN";
      error.style.display = "block";
    }
  } catch (e) {
    error.textContent = "Server error";
    error.style.display = "block";
  }
});
