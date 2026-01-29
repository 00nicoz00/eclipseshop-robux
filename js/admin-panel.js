import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const keysRef = collection(db, "keys");

// ELEMENTI
const totalKeysEl = document.getElementById("totalKeys");
const redeemedKeysEl = document.getElementById("redeemedKeys");
const activeKeysEl = document.getElementById("activeKeys");
const createMsg = document.getElementById("createMsg");
const results = document.getElementById("results");

// 🔢 STATS
async function loadStats() {
  const snap = await getDocs(keysRef);
  let total = 0, redeemed = 0;

  snap.forEach(d => {
    total++;
    if (d.data().redeemed) redeemed++;
  });

  totalKeysEl.textContent = total;
  redeemedKeysEl.textContent = redeemed;
  activeKeysEl.textContent = total - redeemed;
}

loadStats();

// 🔑 CREATE KEY
document.getElementById("createKeyBtn").onclick = async () => {
  const robux = document.getElementById("robuxInput").value;
  const unlimited = document.getElementById("unlimitedInput").checked;

  if (!robux && !unlimited) {
    createMsg.textContent = "Insert robux or select unlimited";
    return;
  }

  const key = crypto.randomUUID().slice(0, 8).toUpperCase();

  await addDoc(keysRef, {
    code: key,
    robux: unlimited ? 0 : Number(robux),
    unlimited,
    redeemed: false,
    createdAt: serverTimestamp()
  });

  createMsg.textContent = `Key created: ${key}`;
  loadStats();
};

// 🔍 SEARCH
document.getElementById("searchInput").addEventListener("input", async e => {
  const value = e.target.value.trim();
  results.innerHTML = "";

  if (!value) return;

  const q = query(keysRef, where("code", "==", value));
  const snap = await getDocs(q);

  snap.forEach(d => {
    const data = d.data();

    const row = document.createElement("div");
    row.className = "key-row";

    row.innerHTML = `
      <div>${data.code}</div>
      <span class="badge ${data.redeemed ? "red" : "green"}">
        ${data.redeemed ? "REDEEMED" : "ACTIVE"}
      </span>
      <button data-id="${d.id}">Delete</button>
    `;

    row.querySelector("button").onclick = async () => {
      await deleteDoc(doc(db, "keys", d.id));
      row.remove();
      loadStats();
    };

    results.appendChild(row);
  });
});

// 🚪 LOGOUT
window.logout = () => {
  localStorage.removeItem("admin");
  location.href = "/admin";
};
