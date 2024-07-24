import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { PORT, JWT_SECRET_KEY, SALT_ROUNDS } from './config/config.js';
import db from './config/db.js';
import userRouter from './routes/userRoutes.js';
import singinRouter from './routes/singinRoutes.js';
import { Rol, User } from './models/index.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Middleware para verificar el token
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    if (token) {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      req.session.user = data;
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
  }

  next(); // Pasar al siguiente middleware o ruta
});

// Configuración de CORS

// app.use(cors({
//     origin: 'http://localhost:3000', // Cambia esto por tu dominio
//     credentials: true
// }));

const whiteList = ['http://localhost:5173', 'https://react-mysql-ten.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

//app.use(cors(corsOptions));

// Inicializar roles y usuario
const initializeRoles = async () => {
  await Rol.findOrCreate({ where: { name: 'ADMIN' } });
  await Rol.findOrCreate({ where: { name: 'USER' } });

  const hashedPassword = await bcrypt.hash('root', SALT_ROUNDS);

  await User.findOrCreate({
    where: {
      rolId: 1,
      name: 'Luciano',
      lastname: 'Romero',
      birthdate: new Date('2002-08-29').toISOString(),
      email: 'luchonromero@gmail.com',
      password: hashedPassword,
      weight: 76,
      height: 1.78,
      BMI: 23.98,
      unit: 'KG',
      active: true
    },
  });
};

// Sincronizar base de datos
db.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    // Si necesitas reiniciar la base de datos, descomenta la siguiente línea
    // return db.sync({ force: true });
  })
  .then(() => {
    //initializeRoles();
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// db.sync()  // 'force: true' elimina y recrea las tablas en cada inicio
//     .then(() => {
//         console.log('Database & tables created!');
//         initializeRoles();
//     })
//     .catch(err => {
//         console.error('Unable to create database & tables:', err);
//     });

// db.sync({force: 'true'})  // 'force: true' elimina y recrea las tablas en cada inicio
//     .then(() => {
//         console.log('Database & tables created!');
//          initializeRoles();
//     })
//     .catch(err => {
//         console.error('Unable to create database & tables:', err);
//     });

// Rutas
app.use('/api',cors(corsOptions), userRouter);
app.use('/api',cors(corsOptions), singinRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
