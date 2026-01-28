import { getStore } from "@netlify/blobs";

const store = getStore({
  name: "admin-pin",
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN
});

export async function savePin(pin, expiresAt) {
  await store.set("current", {
    pin,
    expiresAt
  });
}

export async function getPin() {
  return await store.get("current", { type: "json" });
}

export async function clearPin() {
  await store.delete("current");
}
