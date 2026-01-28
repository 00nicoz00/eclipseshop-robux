const fetch = require("node-fetch");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN))
  });
}

const db = admin.firestore();

exports.handler = async () => {
  try {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = admin.firestore.Timestamp.fromMillis(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await db.collection("adminPins").doc("current").set({
      pin,
      expiresAt
    });

    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **ADMIN PIN**
PIN: **${pin}**
Valid for 24h`
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
