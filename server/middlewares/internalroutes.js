export const validateServerRequest = (req, res, next) => {
    const serverToken = req.headers["pass"];
    console.log('fuclk',serverToken);
    if (serverToken === process.env.SERVER_SECRET) {
      
      next(); // Allow access
    } else {
      res.status(403).send('Forbidden');
    }
  };
  