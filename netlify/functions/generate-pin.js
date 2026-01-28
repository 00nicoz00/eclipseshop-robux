export async function handler() {
  const webhook = process.env.DISCORD_WEBHOOK;

  if (!webhook) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DISCORD_WEBHOOK missing" }),
    };
  }

  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "🔐 Eclipse Admin PIN",
          color: 16711680,
          fields: [
            { name: "PIN", value: `**${pin}**`, inline: true },
            {
              name: "Expires",
              value: `<t:${Math.floor(expiresAt / 1000)}:R>`,
              inline: true,
            },
          ],
          footer: { text: "Eclipse Shop Security" },
        },
      ],
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ pin, expiresAt }),
  };
}
