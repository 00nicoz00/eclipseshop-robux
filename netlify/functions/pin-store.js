let CURRENT_PIN = null;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { pin, expiresAt } = JSON.parse(event.body);

  CURRENT_PIN = {
    pin,
    expiresAt
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ stored: true })
  };
};

// ⚠️ Nota importante:
// su Netlify free questo vive in memoria.
// Va bene per admin PIN temporanei.
// Se un giorno vuoi persistenza → Firestore.
