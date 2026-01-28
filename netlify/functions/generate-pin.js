import { getPinData, setPinData, isExpired } from "./pin-store.js";

export async function handler() {
  const { pin, expiresAt } = getPinData();

  if (!pin || isExpired()) {
    const newPin = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpires = Date.now() + 24 * 60 * 60 * 1000;

    setPinData(newPin, newExpires);

    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **ECLIPSE SHOP – ADMIN PIN**
PIN: **${newPin}**
Scade: <t:${Math.floor(newExpires / 1000)}:R>`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
