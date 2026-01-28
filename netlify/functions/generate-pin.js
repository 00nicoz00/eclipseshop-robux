let activePin = null;
let expiresAt = null;

exports.handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const ttl = 5 * 60 * 1000; // 5 minuti

  activePin = pin;
  expiresAt = Date.now() + ttl;

  // webhook Discord
  if (process.env.DISCORD_WEBHOOK) {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **ADMIN PIN**\nPIN: **${pin}**\nScade in 5 minuti`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      pin,
      expiresAt
    })
  };
};

// condiviso con verify-pin
global.__ADMIN_PIN__ = () => ({ activePin, expiresAt });
