// services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Token } from '../models/index.js';

export const login = async (username, password) => {
  const user = await User.findOne({ where: { USER_NAME: username } });
  if (!user || !(await bcrypt.compare(password, user.PASSWORD))) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { userId: user.USER_ID },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  
  await Token.create({
    USER_ID: user.USER_ID,
    TOKEN: token,
    TOKEN_TYPE: 'Bearer',
    REVOKED: false,
    EXPIRED: false
  });
  
  return token;
};