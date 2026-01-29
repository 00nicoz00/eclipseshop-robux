const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });
}

const db = admin.firestore();

function genKey() {
  return Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
         Math.random().toString(36).substring(2, 6).toUpperCase();
}

exports.handler = async (event) => {
  const { robux, unlimited, amount } = JSON.parse(event.body);

  for (let i = 0; i < amount; i++) {
    await db.collection("keys").add({
      code: genKey(),
      robux: unlimited ? null : Number(robux),
      unlimited,
      redeemed: false,
      username: null,
      placeId: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Keys created successfully" })
  };
};
