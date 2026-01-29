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

async function loadKeys() {
  activeList.innerHTML = "";
  redeemedList.innerHTML = "";

  let total = 0, active = 0, redeemed = 0;

  const q = query(collection(db, "keys"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  snap.forEach(doc => {
    const k = doc.data();
    total++;

    if (k.redeemed) {
      redeemed++;
      redeemedList.innerHTML += `
        <div class="key-row">
          <span>${k.code}</span>
          <span>${k.username || "-"} | ${k.placeId || "-"}</span>
        </div>`;
    } else {
      active++;
      activeList.innerHTML += `
        <div class="key-row">
          <span>${k.code}</span>
          <span>${k.unlimited ? "∞" : k.robux + " R$"}</span>
        </div>`;
    }
  });

  totalKeysEl.textContent = total;
  activeKeysEl.textContent = active;
  redeemedKeysEl.textContent = redeemed;
}

loadKeys();
