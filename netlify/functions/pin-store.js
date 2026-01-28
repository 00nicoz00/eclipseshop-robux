import { getStore } from "@netlify/blobs";

export function getPinStore() {
  return getStore({
    name: "admin-pin-store",
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_TOKEN
  });
}

export const PIN_KEY = "ACTIVE_ADMIN_PIN";
