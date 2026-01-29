import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const activeList = document.getElementById("activeList");
const redeemedList = document.getElementById("redeemedList");

const totalKeysEl = document.getElementById("totalKeys");
const activeKeysEl = document.getElementById("activeKeys");
const redeemedKeysEl = document.getElementById("redeemedKeys");

const btn = document.getElementById("createKeyBtn");
const msg = document.getElementById("createMsg");

btn.onclick = async () => {
  const robux = document.getElementById("robuxInput").value;
  const amount = document.getElementById("amountInput").value;
  const unlimited = document.getElementById("unlimitedCheck").checked;

  const res = await fetch("/.netlify/functions/create-key", {
    method: "POST",
    body: JSON.stringify({ robux, amount, unlimited })
  });

  const data = await res.json();
  msg.textContent = data.message;
  loadKeys();
};

async function deleteKey(id) {
  if (!confirm("Delete this key?")) return;

  await fetch("/.netlify/functions/delete-key", {
    method: "POST",
    body: JSON.stringify({ id })
  });

  loadKeys();
}

async function loadKeys() {
  activeList.innerHTML = "";
  redeemedList.innerHTML = "";

  let total = 0;
  let active = 0;
  let redeemed = 0;

  const q = query(collection(db, "keys"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  snap.forEach(docSnap => {
    const k = docSnap.data();
    const id = docSnap.id;
    total++;

    if (k.redeemed) {
      redeemed++;
      redeemedList.innerHTML += `
        <div class="key-row redeemed">
          <span class="key-code">${k.code}</span>
          <span class="key-info">
            ${k.username || "-"} | ${k.placeId || "-"}
          </span>
          <button class="delete-btn" onclick="deleteKey('${id}')">🗑️</button>
        </div>
      `;
    } else {
      active++;
      activeList.innerHTML += `
        <div class="key-row active">
          <span class="key-code">${k.code}</span>
          <span class="key-info">
            ${k.unlimited ? "∞" : k.robux + " R$"}
          </span>
          <button class="delete-btn" onclick="deleteKey('${id}')">🗑️</button>
        </div>
      `;
    }
  });

  totalKeysEl.textContent = total;
  activeKeysEl.textContent = active;
  redeemedKeysEl.textContent = redeemed;
}

window.deleteKey = deleteKey;
loadKeys();
