import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { JWT_SECRET_KEY, NODE_ENV } from '../config/config.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) throw new Error('Email no registrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    console.log(token);
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production', // Solo en producción usa HTTPS
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .status(200)
      .json({ user, token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
