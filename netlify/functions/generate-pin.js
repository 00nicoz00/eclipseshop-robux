// netlify/functions/generate-pin.js

let activePIN = null;
let expiresAt = null;

export async function handler() {
  // genera pin 6 cifre
  const pin = Math.floor(100000 + Math.random() * 900000).toString();

  // 5 minuti
  expiresAt = Date.now() + 5 * 60 * 1000;
  activePIN = pin;

  // manda webhook Discord
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
    body: JSON.stringify({
      ok: true,
      pin,
      expiresAt
    })
  };
}

// 🔴 ESPORTIAMO LO STATO PER L'ALTRA FUNCTION
export { activePIN, expiresAt };
