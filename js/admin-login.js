document.getElementById("loginBtn").onclick = async () => {
  const pin = document.getElementById("pinInput").value;
  const error = document.getElementById("error");

  error.textContent = "";

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (data.ok) {
    window.location.href = "/admin-panel.html";
  } else {
    error.textContent = data.error || "Login failed";
  }
};
