exports.handler = async (event) => {
  try {
    const { pin } = JSON.parse(event.body || "{}");

    const ADMIN_PIN = process.env.ADMIN_PIN;
    const ADMIN_PIN_EXPIRES = Number(process.env.ADMIN_PIN_EXPIRES);

    if (!ADMIN_PIN || !ADMIN_PIN_EXPIRES) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "PIN not configured" })
      };
    }

    if (Date.now() > ADMIN_PIN_EXPIRES) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "PIN expired" })
      };
    }

    if (pin !== ADMIN_PIN) {
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
      statusCode: 400,
      body: JSON.stringify({ error: "Bad request" })
    };
  }
};
