export async function handler() {
  const now = Date.now();

  if (!globalThis.ADMIN_PIN || now > globalThis.PIN_EXPIRES) {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = now + 24 * 60 * 60 * 1000;

    globalThis.ADMIN_PIN = pin;
    globalThis.PIN_EXPIRES = expiresAt;

    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **ADMIN PIN**\nPIN: **${pin}**\nScade: <t:${Math.floor(expiresAt / 1000)}:R>`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      expiresAt: globalThis.PIN_EXPIRES
    })
  };
}
