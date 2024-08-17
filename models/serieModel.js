import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Serie = db.define('Series', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    repetition: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Serie;