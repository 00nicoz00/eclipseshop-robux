import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.redeem = async function () {
  const keyCode = localStorage.getItem("currentKey");
  const placeId = document.getElementById("placeId").value;
  const username = document.getElementById("username").value;

  const q = query(collection(db, "keys"), where("code", "==", keyCode));
  const snap = await getDocs(q);

  if (snap.empty) {
    alert("Invalid key");
    return;
  }

  const keyDoc = snap.docs[0];

  if (keyDoc.data().redeemed) {
    alert("Key already redeemed");
    return;
  }

  await updateDoc(doc(db, "keys", keyDoc.id), {
    redeemed: true,
    placeId,
    username,
    redeemedAt: serverTimestamp()
  });

  document.getElementById("result").innerHTML = `
    <div class="box">
      <p>✅ Redeem successful</p>
      <p><b>Username:</b> ${username}</p>
      <p><b>Place ID:</b> ${placeId}</p>
    </div>
  `;
};
