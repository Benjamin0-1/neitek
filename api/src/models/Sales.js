const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sales = sequelize.define('Sales', {
    month: {
        type: DataTypes.STRING,
        allowNull: false
    },

    serviceSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    equipmentSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    totalSales: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    comission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    region: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIn: [['north', 'south']]
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Sales;
