import fetch from "node-fetch";
import { savePin } from "./pin-store.js";

export async function handler() {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minuti

  await savePin(pin, expiresAt);

  if (process.env.DISCORD_WEBHOOK) {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 **ADMIN PIN**\n\nPIN: **${pin}**\nScade tra 5 minuti`
      })
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
