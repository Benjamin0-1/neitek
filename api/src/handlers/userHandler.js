const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    try {
        
        const user = await User.findOne({ where: { email } });  
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        };

        const isValid = await user.verifyPassword(password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid password' });
        } else {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({token });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    };

    try {
        
        const user = await User.findOne({ where: { email } }); 
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        };

        const newUser = await User.create({ firstName, lastName, email, passwordHash: password }); 

        // aqui podria enviar email de bienvenida.

        return res.status(201).json({ error: 'User created successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewProfile = async (req, res) => {
    try {
        
        const userEmail = req.user.email;

        const user = await User.findOne({
            where: {
                email: userEmail
            }, 
            attributes: ['firstName', 'lastName', 'email']
        });

        return res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    signup,
    viewProfile,
};

