const res = await fetch("/.netlify/functions/verify-pin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ pin }),
});

const data = await res.json();

if (!data.valid) {
  showError("Wrong or expired PIN");
  return;
}
