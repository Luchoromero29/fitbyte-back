import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ActivePlan = db.define('ActivePlan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});

export default ActivePlan;