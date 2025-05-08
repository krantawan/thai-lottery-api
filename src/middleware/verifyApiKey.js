export function verifyApiKey(req, res, next) {
    const key = req.headers['x-api-key'];
    const validKey = process.env.API_KEY;
  
    if (!key || key !== validKey) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    next();
  }