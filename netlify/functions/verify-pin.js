exports.handler = async (event) => {
  const { pin } = JSON.parse(event.body || "{}");

  const store = global.__ADMIN_PIN__?.();
  if (!store || !store.activePin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "No active PIN" })
    };
  }

  if (Date.now() > store.expiresAt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "PIN expired" })
    };
  }

  if (pin !== store.activePin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid PIN" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
