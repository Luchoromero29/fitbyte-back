import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Routine = db.define('Routine', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Routine;
