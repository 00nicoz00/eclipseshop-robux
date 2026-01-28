const btn = document.getElementById("loginBtn");
const input = document.getElementById("pinInput");
const error = document.getElementById("errorMsg");

btn.addEventListener("click", async () => {
  error.style.display = "none";

  const pin = input.value.trim();

  if (pin.length !== 6) {
    error.textContent = "Invalid PIN format";
    error.style.display = "block";
    return;
  }

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (!res.ok) {
    error.textContent = data.error || "Access denied";
    error.style.display = "block";
    return;
  }

  // LOGIN OK
  window.location.href = "/admin-panel";
});
