import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const activeList = document.getElementById("activeKeysList");
const redeemedList = document.getElementById("redeemedKeysList");

async function loadKeys() {
  activeList.innerHTML = "";
  redeemedList.innerHTML = "";

  const snap = await getDocs(collection(db, "keys"));

  let total = 0, redeemed = 0, active = 0;

  snap.forEach(doc => {
    total++;
    const k = doc.data();

    const div = document.createElement("div");
    div.className = "key-item";
    div.innerHTML = `
      <b>${k.code}</b><br>
      <small>${k.robux || "Unlimited"} Robux</small>
    `;

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

