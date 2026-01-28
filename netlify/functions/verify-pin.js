import { getPin, clearPin } from "./pin-store.js";

export async function handler(event) {
  const { pin } = JSON.parse(event.body || "{}");

  if (!pin) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing PIN" })
    };
  }

  const data = await getPin();

  if (!data) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "No active PIN" })
    };
  }

  if (Date.now() > data.expiresAt) {
    await clearPin();
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "PIN expired" })
    };
  }

  if (pin !== data.pin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid PIN" })
    };
  }

  await clearPin();

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
