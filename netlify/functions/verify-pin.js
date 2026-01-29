// netlify/functions/verify-pin.js

const { getPin, clearPin } = require("./pin-memory");

exports.handler = async (event) => {
  try {
    const { pin } = JSON.parse(event.body || "{}");
    const stored = getPin();

    if (!stored.pin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "NO_ACTIVE_PIN" })
      };
    }

    if (Date.now() > stored.expiresAt) {
      clearPin();
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "PIN_EXPIRED" })
      };
    }

    if (pin !== stored.pin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "INVALID_PIN" })
      };
    }

    clearPin();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "SERVER_ERROR" })
    };
  }
};
