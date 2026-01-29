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

function generateKey() {
  return "XXXX-XXXX-XXXX".replace(/X/g, () =>
    Math.floor(Math.random() * 36).toString(36).toUpperCase()
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { robux, unlimited } = JSON.parse(event.body);

  const code = generateKey();

  await db.collection("keys").add({
    code,
    robux: unlimited ? null : robux,
    unlimited: !!unlimited,
    redeemed: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      code
    })
  };
};
