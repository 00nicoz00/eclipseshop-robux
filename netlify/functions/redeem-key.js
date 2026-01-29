import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function handler(event) {
  const { key, username } = JSON.parse(event.body);

  const snap = await db
    .collection("keys")
    .where("code", "==", key)
    .limit(1)
    .get();

  if (snap.empty) {
    return { statusCode: 400, body: "Invalid key" };
  }

  const docRef = snap.docs[0].ref;
  const data = snap.docs[0].data();

  if (data.redeemed) {
    return { statusCode: 400, body: "Already redeemed" };
  }

  await docRef.update({
    redeemed: true,
    redeemedAt: admin.firestore.FieldValue.serverTimestamp(),
    username,
  });

  // 🔔 DISCORD WEBHOOK
  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🔑 Key Redeemed",
        color: 0xff0000,
        fields: [
          { name: "Key", value: data.code, inline: false },
          { name: "User", value: username, inline: true },
          { name: "Robux", value: data.robux ? `${data.robux}` : "Unlimited", inline: true }
        ],
        footer: {
          text: "Eclipse Shop"
        },
        timestamp: new Date()
      }]
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
