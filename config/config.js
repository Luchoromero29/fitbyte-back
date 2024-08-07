import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// PUERTO DE EJECUCION
export const PORT = process.env.PORT || 3000;

// BASE DE DATOS
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
export const DB_NAME = process.env.DB_NAME || "fitbytedb";
export const DB_PORT = process.env.DB_PORT || 3306;

// SEQUALIZE
export const DIALECT = "mysql";

// BCRYPT
export const SALT_ROUNDS = 10;

// JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default-secret-key";

// ENTORNO
export const NODE_ENV = process.env.NODE_ENV || "production";

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
