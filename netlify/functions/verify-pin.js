import { getPinStore, PIN_KEY } from "./pin-store.js";

export const handler = async (event) => {
  try {
    const { pin } = JSON.parse(event.body || "{}");

    if (!pin) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing PIN" })
      };
    }

    const store = getPinStore();
    const data = await store.getJSON(PIN_KEY);

    if (!data) {
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

    if (pin !== data.pin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid PIN" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
