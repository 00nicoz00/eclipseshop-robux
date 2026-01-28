import { getPinData } from "./generate-pin.js";

export const handler = async (event) => {
  const { pin } = JSON.parse(event.body || "{}");
  const data = getPinData();

  if (!data.currentPin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "No active PIN" })
    };
  }

  if (Date.now() > data.expiresAt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "PIN expired" })
    };
  }

  if (pin !== data.currentPin) {
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
