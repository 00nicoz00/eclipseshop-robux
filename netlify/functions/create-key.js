const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const { robux, unlimited } = JSON.parse(event.body);

  const code = Math.random().toString(36).substring(2, 12).toUpperCase();

  await db.collection("keys").add({
    code,
    robux: Number(robux),
    unlimited,
    redeemed: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { statusCode: 200 };
};
