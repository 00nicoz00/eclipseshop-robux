const db = require("./_firebaseAdmin");

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  await db.collection("keys").doc(id).delete();

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
