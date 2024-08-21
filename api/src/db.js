const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '12241530',
    database: process.env.DB_NAME || 'sales',
    logging: false
});

module.exports = sequelize;
