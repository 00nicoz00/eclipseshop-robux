import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { pin } = JSON.parse(req.body || "{}");
  if (!pin) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing PIN" }) };
  }

  const store = getStore("admin-pin");
  const saved = await store.get("current");

  if (!saved) {
    return { statusCode: 401, body: JSON.stringify({ error: "No active PIN" }) };
  }

  const { pin: savedPin, expiresAt } = JSON.parse(saved);

  if (Date.now() > expiresAt) {
    return { statusCode: 401, body: JSON.stringify({ error: "PIN expired" }) };
  }

  if (pin !== savedPin) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid PIN" }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
