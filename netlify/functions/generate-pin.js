import fetch from "node-fetch";
import { getPinStore, PIN_KEY } from "./pin-store.js";

export const handler = async () => {
  try {
    const store = getPinStore();

    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await store.setJSON(PIN_KEY, {
      pin,
      expiresAt
    });

    if (process.env.DISCORD_WEBHOOK) {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🔐 New Admin PIN",
            color: 15158332,
            fields: [
              { name: "PIN", value: `\`${pin}\`` },
              { name: "Expires", value: "<t:" + Math.floor(expiresAt / 1000) + ":R>" }
            ]
          }]
        })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, pin, expiresAt })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
