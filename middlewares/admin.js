import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config/config.js'

const isAdmin = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      req.user = decoded; // Añade la información del usuario decodificada a la solicitud
      
      //verifico si es admin
      if (decoded.user.rolId !== 1) return res.status(403).send({message: "No tienes acceso"})
      
        next();
    } catch (err) {
      return res.status(401).json({ message: 'Token no válido o expirado.' });
    }
}

export default isAdmin;