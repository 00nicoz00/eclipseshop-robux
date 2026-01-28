const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { pin } = JSON.parse(event.body);
  const store = getStore("admin-pin");
  const data = await store.get("current");

  if (!data) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, reason: "no_pin" })
    };
  }

  if (Date.now() > data.expiresAt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ valid: false, reason: "expired" })
    };
  }

  if (pin !== data.pin) {
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
