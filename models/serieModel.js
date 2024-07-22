import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Serie = db.define('Serie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    weigth: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    repetition: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Serie;