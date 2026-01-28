document.getElementById("loginBtn").addEventListener("click", async () => {
  const pin = document.getElementById("pinInput").value;
  const error = document.getElementById("errorMsg");

  error.style.display = "none";

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (data.ok) {
    window.location.href = "/admin-panel.html";
  } else {
    error.textContent = data.error || "Access denied";
    error.style.display = "block";
  }
});
