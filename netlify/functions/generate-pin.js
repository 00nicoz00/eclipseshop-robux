let activePin = null;
let expiresAt = null;

exports.handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const ttl = 5 * 60 * 1000; // 5 minuti

  activePin = pin;
  expiresAt = Date.now() + ttl;

  console.log("NEW PIN:", pin);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      pin,
      expiresAt
    })
  };
};
