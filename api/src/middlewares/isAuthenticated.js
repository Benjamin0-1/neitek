const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { User } = require('../models');
const { JWT_SECRET } = process.env;

const isAuthenticated = async (req, res, next) => {
    // Bypass authentication for login and signup routes
    if (req.originalUrl === '/api/users/login' || req.originalUrl === '/api/users/signup') {
        return next();
    }

    req.user = req.user || {}; 

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token is required' });
    }

    const token = authorization.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user.id = decoded.id;
        req.user.email = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};

module.exports = isAuthenticated;
