const db = require("./_firebaseAdmin");
const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405 };

  const { robux, unlimited } = JSON.parse(event.body);

  const code = crypto.randomBytes(4).toString("hex").toUpperCase();

  await db.collection("keys").add({
    code,
    robux: unlimited ? null : Number(robux),
    unlimited: !!unlimited,
    redeemed: false,
    createdAt: Date.now(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ code }),
  };
};
