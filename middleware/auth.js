import jwt from 'jsonwebtoken';
import { Token } from '../models/index.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const dbToken = await Token.findOne({ 
      where: { 
        TOKEN: token,
        USER_ID: decoded.userId,
        REVOKED: false,
        EXPIRED: false
      }
    });
    
    if (!dbToken) return res.sendStatus(403);
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};