// PROTEZIONE ACCESSO
const auth = localStorage.getItem("admin_auth");

if (!auth) {
  window.location.href = "/admin";
}

try {
  const session = JSON.parse(auth);
  if (Date.now() > session.expiresAt) {
    localStorage.removeItem("admin_auth");
    window.location.href = "/admin";
  }
} catch {
  localStorage.removeItem("admin_auth");
  window.location.href = "/admin";
}

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("admin_auth");
  window.location.href = "/admin";
});

// QUI POI COLLEGHEREMO FIRESTORE
const keysContainer = document.getElementById("keysContainer");

// Placeholder UI (finché non colleghiamo Firestore)
keysContainer.innerHTML = `
  <div class="key-row">
    <div>
      <strong>ABCD-1234-EFGH</strong><br/>
      Robux: 1000
    </div>
    <span class="badge red">Unused</span>
    <div>
      Place ID: —<br/>
      Username: —
    </div>
  </div>
`;
