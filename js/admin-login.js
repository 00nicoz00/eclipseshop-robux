document.getElementById("login").addEventListener("click", async () => {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  const msg = document.getElementById("msg");

  msg.textContent = "Loading...";

  const res = await fetch("/.netlify/functions/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.ok) {
    localStorage.setItem("admin-auth", "true");
    window.location.href = "/admin-panel.html";
  } else {
    msg.textContent = "Invalid username or password";
  }
});
