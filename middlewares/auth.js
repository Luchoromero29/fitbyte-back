import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config/config.js'
import User from '../models/userModel.js';

const isAuth = async (req, res, next) => {

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decoded);
    
    req.data = decoded
    req.token = token // Añade la información del usuario decodificada a la solicitud
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token no válido o expirado.' });
  }
}

export default isAuth;