import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Rol = db.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Rol;