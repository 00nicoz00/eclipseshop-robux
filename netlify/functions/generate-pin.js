let currentPin = null;
let expiresAt = null;

export const handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minuti

  currentPin = pin;
  expiresAt = expires;

  // Webhook Discord
  if (process.env.DISCORD_WEBHOOK) {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **Admin PIN**\n\nPIN: **${pin}**\nScade tra 5 minuti`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};

// ESPORTIAMO per verify-pin
export const getPinData = () => ({ currentPin, expiresAt });
