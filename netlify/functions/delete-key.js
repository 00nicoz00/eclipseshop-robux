const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  await db.collection("keys").doc(id).delete();

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
