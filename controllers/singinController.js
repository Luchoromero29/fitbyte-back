import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';
import { JWT_SECRET_KEY, NODE_ENV } from '../config/config.js';

// Función de login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    
    console.log(email, password);
    
    if (!user) {
      return res.status(400).json({
        ok: false,
        status: 400,
        body: { error: 'Email no registrado' }
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    
    if (!isValid) {
      return res.status(400).json({
        ok: false,
        status: 400,
        body: { error: 'Contraseña incorrecta' }
      });
    }

    const payload = { user: user};
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const data = {
      user
    }

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .status(200)
      .json({
        ok: true,
        status: 200,
        body: { data, token }
      });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { error: error.message }
    });
  }
};

// Función de logout
export const logout = async (req, res) => {
  res
    .cookie('access_token', '', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Fecha de expiración en el pasado
    })
    .status(200)
    .json({
      ok: true,
      status: 200,
      body: { message: 'Cierre de sesión exitoso' }
    });
};
