const db = require("./_firebaseAdmin");

exports.handler = async () => {
  const snap = await db.collection("keys").get();

  let total = snap.size;
  let redeemed = 0;

  snap.forEach(d => {
    if (d.data().redeemed) redeemed++;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      total,
      redeemed,
      available: total - redeemed
    }),
  };
};
