import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Activity = db.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    focus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postRest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});

export default Activity;