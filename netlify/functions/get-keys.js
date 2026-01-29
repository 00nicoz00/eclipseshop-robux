const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

exports.handler = async () => {
  const snap = await db.collection("keys").orderBy("createdAt", "desc").get();

  const keys = snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(keys)
  };
};
