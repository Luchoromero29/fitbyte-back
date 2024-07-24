import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';
import { JWT_SECRET_KEY, NODE_ENV } from '../config/config.js';

//funcion de login 
export const login = async (req, res) => {
  try {

    //recuperamos datos del login
    const { email, password } = req.body;

    
    //verificamos existencia y contrasenia correcta
    const user = await User.findOne({ where: { email: email } });
    if (!user) throw new Error('Email no registrado');
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');
    console.log("Hola");
    //creamos el payload de datos para el token, con user y iat(mometno de creacion del token), exp(momento de expiracion del token)
    const payload = { 
      user: user
    }
    
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
  
    //lo guardamos a travez de la cookie
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .status(200)
      .json({ user, token });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const logout = async (req, res) => {
  res
  .cookie('access_token', '', {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Fecha de expiración en el pasado
  })
  .status(200)
  .json({ message: 'Cierre de sesión exitoso' });
}