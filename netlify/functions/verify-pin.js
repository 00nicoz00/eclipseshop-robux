export async function handler(event) {
  const { pin } = JSON.parse(event.body || "{}");

  if (!globalThis.ADMIN_PIN || Date.now() > globalThis.PIN_EXPIRES) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "PIN expired" })
    };
  }

  if (pin !== globalThis.ADMIN_PIN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "Invalid PIN" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
