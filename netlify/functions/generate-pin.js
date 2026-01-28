const fetch = require("node-fetch");

const PIN_TTL = 24 * 60 * 60 * 1000; // 24 ore in millisecondi

exports.handler = async () => {
  try {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + PIN_TTL;

    // salva pin chiamando pin-store
    await fetch(`${process.env.URL}/.netlify/functions/pin-store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin, expiresAt })
    });

    // webhook discord
    if (process.env.DISCORD_WEBHOOK) {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🔐 Admin PIN Generated",
            color: 15158332,
            fields: [
              { name: "PIN", value: `\`${pin}\``, inline: true },
              { name: "Expires", value: `<t:${Math.floor(expiresAt / 1000)}:R>`, inline: true }
            ]
          }]
        })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
