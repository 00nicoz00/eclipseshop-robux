const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

exports.handler = async () => {
  const snap = await db.collection("keys").get();

  let total = 0;
  let redeemed = 0;
  let active = 0;

  snap.forEach(doc => {
    total++;
    doc.data().redeemed ? redeemed++ : active++;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ total, redeemed, active })
  };
};
