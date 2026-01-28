const { getStore } = require("@netlify/blobs");
const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const store = getStore("admin-pin");

    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await store.set("current", { pin, expiresAt });

    // Discord webhook
    if (process.env.DISCORD_WEBHOOK) {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🔐 Admin PIN",
            color: 15158332,
            fields: [
              { name: "PIN", value: `\`${pin}\``, inline: true },
              { name: "Scade", value: `<t:${Math.floor(expiresAt / 1000)}:R>`, inline: true }
            ]
          }]
        })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
