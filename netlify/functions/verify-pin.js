import { Buffer } from "buffer";

let currentPin = null;
let expiresAt = null;

export async function handler(event) {
  const { pin } = JSON.parse(event.body || "{}");

  if (!currentPin || !expiresAt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false }),
    };
  }

  if (Date.now() > expiresAt) {
    currentPin = null;
    expiresAt = null;
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ valid: pin === currentPin }),
  };
}
