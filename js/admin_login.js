const btn = document.getElementById("loginBtn");
const input = document.getElementById("pinInput");
const error = document.getElementById("errorMsg");

btn.addEventListener("click", async () => {
  const pin = input.value.trim();
  if (pin.length !== 6) {
    showError("Invalid PIN format");
    return;
  }

  try {
    const res = await fetch("/.netlify/functions/generate-pin");
    const data = await res.json();

    if (data.pin !== pin) {
      showError("Wrong PIN");
      return;
    }

    if (Date.now() > data.expiresAt) {
      showError("PIN expired");
      return;
    }

    // salva sessione admin
    localStorage.setItem("admin_auth", JSON.stringify({
      pin,
      expiresAt: data.expiresAt
    }));

    window.location.href = "/admin-panel";
  } catch (e) {
    showError("Server error");
  }
});

function showError(msg) {
  error.textContent = msg;
  error.style.display = "block";
}
