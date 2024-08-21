const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('passwordHash', hash);
        }
    }
});

User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = User;
