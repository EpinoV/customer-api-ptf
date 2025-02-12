import httpErrors from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Token } from '../models/index.js';

export const login = async (req, res, next) => {
  console.info('----------------------------------------------------');
  console.info('Iniciando login...');
  try {
    const { user_name, password } = req.body;
    // Validar entrada
    if (!user_name || !password) {
      throw new httpErrors.BadRequest('Username and password are required');
    }
    console.info('User name: ' + user_name + ', Ingresado correctamente');

    // Buscar usuario
    const user = await User.findOne({ where: { USER_NAME: user_name } });
    if (!user) {
      console.log('User not registered');
      throw new httpErrors.NotFound('User not registered');
    }
    console.info('User name: ' + user_name + ', Encontrado correctamente');

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      throw new httpErrors.Unauthorized('Invalid credentials');
    }
    console.info('User name: ' + user_name + ', Contraseña correcta');

    // Generar JWT
    const token = jwt.sign(
      { userId: user.USER_ID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.info('User name: ' + user_name + ', Token generado correctamente');

    // Guardar token en base de datos
    await Token.create({
      USER_ID: user.USER_ID,
      TOKEN: token,
      TOKEN_TYPE: 'Bearer',
      REVOKED: false,
      EXPIRED: false
    });
    console.info('User name: ' + user_name + ', Token guardado correctamente');

    res.json({
      success: true,
      token: token,
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    console.info('User name: ' + user_name + ', Login exitoso');

  } catch (error) {
    console.log("Error inesperado");
    console.error(error);
    next(error);
  }
  console.info('----------------------------------------------------');
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