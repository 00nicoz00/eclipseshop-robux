import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

if (!localStorage.getItem("admin")) {
  window.location.href = "login.html";
}

function randomKey() {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

window.createKeys = async function () {
  const robux = Number(document.getElementById("robux").value);
  const amount = Number(document.getElementById("amount").value);

  for (let i = 0; i < amount; i++) {
    await addDoc(collection(db, "keys"), {
      code: randomKey(),
      robux,
      unlimited: false,
      redeemed: false,
      placeId: "",
      username: "",
      createdAt: serverTimestamp()
    });
  }

  loadKeys();
};

async function loadKeys() {
  const snap = await getDocs(collection(db, "keys"));
  const div = document.getElementById("keysList");
  div.innerHTML = "";

  snap.forEach(docu => {
    const k = docu.data();

    div.innerHTML += `
      <div class="key-row">
        <div>
          <b>${k.code}</b><br>
          <small>Robux: ${k.unlimited ? "∞" : k.robux}</small>
        </div>

        <div>
          ${k.redeemed
            ? `<span class="badge green">Redeemed</span>`
            : `<span class="badge red">Unused</span>`}
        </div>

        <div>
          <small>User: ${k.username || "-"}</small><br>
          <small>Place: ${k.placeId || "-"}</small>
        </div>
      </div>
    `;
  });
}


loadKeys();
