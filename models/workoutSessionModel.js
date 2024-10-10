import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const WorkoutSession = db.define('workout_session', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

export default Serie;