
const router = require('express').Router();
const salesRouter = require('./salesRouter');
const userRouter = require('./userRouter');
const comissionRouter = require('./comissionRouter');

router
.use('/sales', salesRouter)
.use('/comission', comissionRouter) 
.use('/users', userRouter);

module.exports = router;