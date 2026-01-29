// netlify/functions/pin-memory.js

let activePin = null;
let expiresAt = null;

module.exports = {
  setPin(pin, expiry) {
    activePin = pin;
    expiresAt = expiry;
  },

  getPin() {
    return { pin: activePin, expiresAt };
  },

  clearPin() {
    activePin = null;
    expiresAt = null;
  }
};
