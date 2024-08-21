const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comission = sequelize.define('Comission', {
    month: {
        type: DataTypes.STRING,
        allowNull: true
    },

    baseComission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    serviceBonus: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    equipmentBonus: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    totalComission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    salesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});

module.exports = Comission;