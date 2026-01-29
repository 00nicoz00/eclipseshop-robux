import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const activeList = document.getElementById("activeKeysList");
const redeemedList = document.getElementById("redeemedKeysList");

async function loadKeys() {
  activeList.innerHTML = "";
  redeemedList.innerHTML = "";

  const snap = await getDocs(collection(db, "keys"));

  let total = 0, redeemed = 0, active = 0;

  snap.forEach(d => {
    total++;
    const k = d.data();

    const div = document.createElement("div");
    div.className = "key-item fade-up";
    div.innerHTML = `
      <b>${k.code}</b><br>
      <small>${k.robux || "Unlimited"} Robux</small>
      <button class="delete-btn">Delete</button>
    `;

    div.querySelector(".delete-btn").onclick = async () => {
      if (!confirm("Delete this key?")) return;
      await deleteDoc(doc(db, "keys", d.id));
      loadKeys();
    };

    if (k.redeemed) {
      redeemed++;
      redeemedList.appendChild(div);
    } else {
      active++;
      activeList.appendChild(div);
    }
  });

  document.getElementById("totalKeys").textContent = total;
  document.getElementById("redeemedKeys").textContent = redeemed;
  document.getElementById("activeKeys").textContent = active;
}

loadKeys();
