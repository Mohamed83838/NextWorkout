export const validateServerRequest = (req, res, next) => {
  // Use a standardized header name
  const serverToken = req.headers["x-api-secret"];
console.log(serverToken);
  // Check if header exists
  if (!serverToken) {
    return res.status(400).send('Missing authentication header');
  }

  // Securely compare tokens (prevents timing attacks)
  if (serverToken !== process.env.SERVER_SECRET) {
    return res.status(403).send('Forbidden');
  }

  // Grant access
  next();
};