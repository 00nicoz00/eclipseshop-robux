const activeList = document.getElementById("activeList");
const redeemedList = document.getElementById("redeemedList");

const totalKeys = document.getElementById("totalKeys");
const redeemedKeys = document.getElementById("redeemedKeys");
const activeKeys = document.getElementById("activeKeys");

async function loadKeys() {
  const res = await fetch("/.netlify/functions/list-keys");
  const data = await res.json();

  activeList.innerHTML = "";
  redeemedList.innerHTML = "";

  totalKeys.textContent = data.length;
  redeemedKeys.textContent = data.filter(k => k.redeemed).length;
  activeKeys.textContent = data.filter(k => !k.redeemed).length;

  data.forEach(k => {
    const div = document.createElement("div");
    div.className = "key-item";

    div.innerHTML = `
      <code>${k.code}</code>
      <small>${k.robux} Robux</small>
      ${k.redeemed ? "" : `<button onclick="deleteKey('${k.id}')">Delete</button>`}
    `;

    k.redeemed ? redeemedList.appendChild(div) : activeList.appendChild(div);
  });
}

async function deleteKey(id) {
  if (!confirm("Delete this key?")) return;
  await fetch("/.netlify/functions/delete-key", {
    method: "POST",
    body: JSON.stringify({ id })
  });
  loadKeys();
}
loadKeys();
const createBtn = document.getElementById("createKeyBtn");
const robuxInput = document.getElementById("robuxInput");
const unlimitedCheck = document.getElementById("unlimitedCheck");
const createMsg = document.getElementById("createMsg");

createBtn.addEventListener("click", async () => {
  const robux = robuxInput.value;
  const unlimited = unlimitedCheck.checked;

  if (!unlimited && (!robux || robux <= 0)) {
    createMsg.textContent = "Insert a valid Robux amount";
    return;
  }

  createMsg.textContent = "Creating key...";

  try {
    const res = await fetch("/.netlify/functions/create-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        robux: unlimited ? null : Number(robux),
        unlimited
      })
    });

    const data = await res.json();

    if (!data.ok) {
      createMsg.textContent = "Error creating key";
      return;
    }

    createMsg.innerHTML = `✅ Key created:<br><code>${data.code}</code>`;
    robuxInput.value = "";
    unlimitedCheck.checked = false;

    loadKeys(); // ricarica dashboard
  } catch (err) {
    createMsg.textContent = "Server error";
  }
});

