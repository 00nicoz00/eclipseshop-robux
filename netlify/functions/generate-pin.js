let currentPin = null;
let expiresAt = null;

export async function handler() {
  const now = Date.now();

  // se esiste ed è ancora valido, NON rigenerare
  if (currentPin && expiresAt && now < expiresAt) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  }

  currentPin = Math.floor(100000 + Math.random() * 900000).toString();
  expiresAt = now + 24 * 60 * 60 * 1000;

  const webhook = process.env.DISCORD_WEBHOOK;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "🔐 Eclipse Admin PIN",
          color: 16711680,
          fields: [
            { name: "PIN", value: `**${currentPin}**`, inline: true },
            {
              name: "Expires",
              value: `<t:${Math.floor(expiresAt / 1000)}:R>`,
              inline: true,
            },
          ],
        },
      ],
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}
