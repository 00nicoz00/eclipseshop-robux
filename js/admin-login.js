document.addEventListener("DOMContentLoaded", () => {
  const pinInput = document.getElementById("pinInput");
  const loginBtn = document.getElementById("loginBtn");
  const errorMsg = document.getElementById("errorMsg");

  if (!pinInput || !loginBtn || !errorMsg) {
    console.error("Admin login elements missing");
    return;
  }

  loginBtn.addEventListener("click", async () => {
    const pin = pinInput.value.trim();

    errorMsg.style.display = "none";
    errorMsg.textContent = "";

    if (!/^\d{6}$/.test(pin)) {
      errorMsg.textContent = "Invalid PIN format";
      errorMsg.style.display = "block";
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
      });

      const data = await res.json();

      if (data.ok) {
        window.location.href = "/admin-panel.html";
      } else {
        errorMsg.textContent = data.error || "Invalid or expired PIN";
        errorMsg.style.display = "block";
      }

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "Server error";
      errorMsg.style.display = "block";
    }
  });
});
