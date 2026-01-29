// netlify/functions/generate-pin.js

const { setPin } = require("./pin-memory");

exports.handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minuti

  setPin(pin, expiresAt);

  // webhook (opzionale)
  if (process.env.DISCORD_WEBHOOK) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🔐 **Admin PIN**\n\nPIN: **${pin}**\nScade tra 5 minuti`
        })
      });
    } catch (e) {
      console.error("Webhook error", e);
    }
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
