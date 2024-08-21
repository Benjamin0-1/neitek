const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales'); 
const salesRouter = express.Router();
const { getAllSales, getSaleById, createSale, calculateComission} = require('../handlers/salesHandler');


salesRouter
.get('/all-sales', getAllSales)
.get('/sale/:id', getSaleById)
.post('/create-sale', createSale)
.get('/calculate-comission/:id', calculateComission);

module.exports = salesRouter;
