import httpErrors from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Token } from '../models/index.js';

export const login = async (req, res, next) => {
  try {
    console.log("Login");
    const { user_name, password } = req.body;

    // Validar entrada
    if (!user_name || !password) {
      throw new httpErrors.BadRequest('Username and password are required');
    }

    // Buscar usuario
    const user = await User.findOne({ where: { USER_NAME: user_name } });
    if (!user) {
      console.log('User not registered');
      throw new httpErrors.NotFound('User not registered');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      throw new httpErrors.Unauthorized('Invalid credentials');
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user.USER_ID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Guardar token en base de datos
    await Token.create({
      USER_ID: user.USER_ID,
      TOKEN: token,
      TOKEN_TYPE: 'Bearer',
      REVOKED: false,
      EXPIRED: false
    });

    res.json({
      success: true,
      token: token,
      expiresIn: process.env.JWT_EXPIRES_IN
    });

  } catch (error) {
    console.log("Error inesperado");
    console.error(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    // Revocar token
    await Token.update(
      { REVOKED: true },
      { where: { TOKEN: token } }
    );

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(new httpErrors.InternalServerError('Logout failed'));
  }
};