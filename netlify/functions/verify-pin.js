// netlify/functions/verify-pin.js

import { activePIN, expiresAt } from "./generate-pin.js";

export async function handler(event) {
  const { pin } = JSON.parse(event.body || "{}");

  if (!activePIN || !expiresAt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No active PIN" })
    };
  }

  if (Date.now() > expiresAt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "PIN expired" })
    };
  }

  if (pin !== activePIN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid PIN" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}
