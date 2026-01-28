const store = require("./pin-store");

exports.handler = async (event) => {
  const { pin } = JSON.parse(event.body || "{}");
  const saved = store.getPin();

  if (!saved.pin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "No active PIN" })
    };
  }

  if (Date.now() > saved.expiresAt) {
    store.clearPin();
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "PIN expired" })
    };
  }

  if (pin !== saved.pin) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "Invalid PIN" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
