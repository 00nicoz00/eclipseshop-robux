const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN))
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const { pin } = JSON.parse(event.body);

  const doc = await db.collection("adminPins").doc("current").get();
  if (!doc.exists) {
    return { statusCode: 401, body: JSON.stringify({ valid: false }) };
  }

  const data = doc.data();
  const now = admin.firestore.Timestamp.now();

  const valid =
    pin === data.pin &&
    data.expiresAt.toMillis() > now.toMillis();

  return {
    statusCode: 200,
    body: JSON.stringify({ valid })
  };
};
