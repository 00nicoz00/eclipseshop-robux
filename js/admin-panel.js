if (!localStorage.getItem("admin")) {
  location.href = "/admin";
}

async function loadStats() {
  const res = await fetch("/.netlify/functions/get-stats");
  const s = await res.json();

  document.getElementById("stats").innerHTML = `
    Total: ${s.total} |
    Active: ${s.active} |
    Redeemed: ${s.redeemed}
  `;
}

async function loadKeys() {
  const res = await fetch("/.netlify/functions/get-keys");
  const data = await res.json();

  const container = document.getElementById("keys");
  container.innerHTML = "";

  data.forEach(k => {
    container.innerHTML += `
      <div class="key-row">
        <span>${k.code}</span>
        <span class="badge ${k.redeemed ? "red" : "green"}">
          ${k.redeemed ? "USED" : "ACTIVE"}
        </span>
        <button onclick="deleteKey('${k.id}')">🗑️</button>
      </div>
    `;
  });
}

async function deleteKey(id) {
  if (!confirm("Delete this key?")) return;

  await fetch("/.netlify/functions/delete-key", {
    method: "POST",
    body: JSON.stringify({ id })
  });

  loadKeys();
  loadStats();
}

document.getElementById("createKey").onclick = async () => {
  const robux = document.getElementById("robux").value;
  const unlimited = document.getElementById("unlimited").checked;

  await fetch("/.netlify/functions/create-key", {
    method: "POST",
    body: JSON.stringify({ robux, unlimited })
  });

  loadKeys();
  loadStats();
};

function logout() {
  localStorage.removeItem("admin");
  location.href = "/admin";
}

loadKeys();
loadStats();
