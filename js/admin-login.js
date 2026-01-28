document.getElementById("loginBtn").onclick = async () => {
  const pin = document.getElementById("pin").value;

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (data.ok) {
    location.href = "/admin-panel.html";
  } else {
    document.getElementById("error").textContent = data.error;
  }
};
