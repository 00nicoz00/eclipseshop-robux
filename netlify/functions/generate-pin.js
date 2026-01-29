exports.handler = async () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minuti

  return {
    statusCode: 200,
    body: JSON.stringify({
      pin,
      expiresAt,
      note: "Copia questi valori in Environment Variables"
    })
  };
};
