let CURRENT_PIN = null;

// condividiamo lo stesso store in memoria
try {
  CURRENT_PIN = require("./pin-store").CURRENT_PIN;
} catch {}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { pin } = JSON.parse(event.body);

  if (!CURRENT_PIN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, reason: "no_pin" })
    };
  }

  if (Date.now() > CURRENT_PIN.expiresAt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, reason: "expired" })
    };
  }

  if (pin !== CURRENT_PIN.pin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, reason: "wrong" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ valid: true })
  };
};
