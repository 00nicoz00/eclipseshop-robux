const pinInput = document.getElementById("pinInput");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", login);

pinInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

async function login() {
  const pin = pinInput.value.trim();

  if (!/^\d{6}$/.test(pin)) {
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

    localStorage.setItem(
      "admin_auth",
      JSON.stringify({
        expiresAt: data.expiresAt,
      })
    );

    window.location.href = "/admin-panel";
  } catch (err) {
    showError("Server error");
  }
}

function showError(text) {
  errorMsg.textContent = text;
  errorMsg.style.display = "block";
}
