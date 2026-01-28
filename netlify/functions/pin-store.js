export function getPinData() {
  return {
    pin: globalThis.ADMIN_PIN,
    expiresAt: globalThis.PIN_EXPIRES
  };
}

export function setPinData(pin, expiresAt) {
  globalThis.ADMIN_PIN = pin;
  globalThis.PIN_EXPIRES = expiresAt;
}

export function isExpired() {
  return !globalThis.PIN_EXPIRES || Date.now() > globalThis.PIN_EXPIRES;
}
