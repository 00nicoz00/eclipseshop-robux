let currentPin = null;
let expiresAt = null;

module.exports = {
  setPin(pin, expiry) {
    currentPin = pin;
    expiresAt = expiry;
  },

  getPin() {
    return { pin: currentPin, expiresAt };
  },

  clearPin() {
    currentPin = null;
    expiresAt = null;
  }
};
