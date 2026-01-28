document.getElementById("loginBtn").addEventListener("click", async () => {
  const pin = document.getElementById("pinInput").value.trim();

  const res = await fetch("/.netlify/functions/verify-pin", {
    method: "POST",
    body: JSON.stringify({ pin })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin-auth", "true");
    location.href = "/admin-panel";
  } else {
    alert("❌ Invalid PIN");
  }
});
