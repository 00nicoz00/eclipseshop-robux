let activePin = null;
let expiresAt = null;

exports.handler = async (event) => {
  const { pin } = JSON.parse(event.body || "{}");

  if (!activePin || !expiresAt) {
    return json(false, "No active PIN");
  }

  if (Date.now() > expiresAt) {
    activePin = null;
    expiresAt = null;
    return json(false, "PIN expired");
  }

  if (pin !== activePin) {
    return json(false, "Invalid PIN");
  }

  // PIN OK → invalida subito
  activePin = null;
  expiresAt = null;

  return json(true);
};

function json(ok, error) {
  return {
    statusCode: ok ? 200 : 401,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ok ? { ok: true } : { ok: false, error })
  };
}
