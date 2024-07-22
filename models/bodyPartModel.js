import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const BodyPart = db.define('BodyPart', {
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

export default BodyPart;