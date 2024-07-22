import mysql from 'mysql2';
import dotenv from 'dotenv';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DIALECT } from './config.js';
import { Sequelize } from 'sequelize';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DIALECT
})

export default db;