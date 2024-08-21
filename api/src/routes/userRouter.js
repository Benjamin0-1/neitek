const userRouter = require('express').Router();
const { login, signup, viewProfile} = require('../handlers/userHandler');
//const loginRateLimiter = require('../middlewares/loginRateLimiter');

userRouter
.post('/login', login)
.post('/signup', signup)
.get('/profile', viewProfile)

module.exports = userRouter;
