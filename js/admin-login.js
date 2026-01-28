document.getElementById("loginBtn").addEventListener("click", login);

async function login() {
  const pin = document.getElementById("pinInput").value;
  const error = document.getElementById("errorMsg");

  error.style.display = "none";

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin-auth", "true");
    location.href = "/admin-panel.html";
  } else {
    error.innerText = data.error || "Invalid PIN";
    error.style.display = "block";
  }
}
