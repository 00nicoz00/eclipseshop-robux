import { getPinData, isExpired } from "./pin-store.js";

export async function handler(event) {
  const { pin } = JSON.parse(event.body || "{}");
  const stored = getPinData();

  if (!stored.pin || isExpired()) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "PIN expired" })
    };
  }

  if (pin !== stored.pin) {
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
