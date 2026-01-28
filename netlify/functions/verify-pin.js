export async function handler(event) {
  try {
    const { pin } = JSON.parse(event.body || "{}");

    if (!pin) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing PIN" })
      };
    }

    const storedPin = process.env.ADMIN_PIN;
    const expiresAt = Number(process.env.ADMIN_PIN_EXPIRES);

    if (!storedPin || !expiresAt) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No active PIN" })
      };
    }

    if (Date.now() > expiresAt) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "PIN expired" })
      };
    }

    if (pin !== storedPin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid PIN" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" })
    };
  }
}
