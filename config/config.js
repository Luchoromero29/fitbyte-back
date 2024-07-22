//PUERTO DE EJECUCION
export const PORT = process.env.PORT || 3000;

//BASE DE DATOS
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_USER = process.env.DB_USER || "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || "root"
export const DB_NAME = process.env.DB_NAME || "fitbytedb"
export const DB_PORT = process.env.DB_PORT || 3306

//SEQUALIZE
export const DIALECT = "mysql"


//BCRYPT
export const SALT_ROUNDS = 10;

//JWT 
export const JWT_SECRET_KEY = "romero-roman-necochea-herrera-durato-miniti-dipierro-marino-silva-chamorra-sbworak-sbworak"

//ENTORNO
export const NODE_ENV = "production"