const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  errorMsg.style.display = "none";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    errorMsg.textContent = "Insert username and password";
    errorMsg.style.display = "block";
    return;
  }

  try {
    const res = await fetch("/.netlify/functions/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("adminAuth", "true");
    window.location.href = "/admin-panel.html";

  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.style.display = "block";
  }
});
