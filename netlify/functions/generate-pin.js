const store = require("./pin-store");

exports.handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h

  store.setPin(pin, expiresAt);

  if (process.env.DISCORD_WEBHOOK) {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **NEW ADMIN PIN**\nPIN: **${pin}**\nExpires in 24h`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
