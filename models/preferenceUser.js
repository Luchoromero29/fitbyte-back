

import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const PreferenceUser = db.define('PreferenceUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    unitWeight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
});

export default PreferenceUser;
