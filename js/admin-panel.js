import { db } from "./firebase-client.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("keyList");
const search = document.getElementById("search");

async function loadKeys(filter = "") {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "keys"));

  snap.forEach(d => {
    const k = d.data();
    if (!k.code.includes(filter)) return;

    const row = document.createElement("div");
    row.className = "key-row";
    row.innerHTML = `
      <div>${k.code}</div>
      <div>${k.redeemed ? "✅ Redeemed" : "🟢 Active"}</div>
      <button data-id="${d.id}">🗑️</button>
    `;

    row.querySelector("button").onclick = async () => {
      await fetch("/.netlify/functions/delete-key", {
        method: "POST",
        body: JSON.stringify({ id: d.id })
      });
      loadKeys(search.value);
    };

    list.appendChild(row);
  });
}

search.oninput = e => loadKeys(e.target.value);
loadKeys();
