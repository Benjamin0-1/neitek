const comissionRouter = require('express').Router();
const { getAllComissions, getComissionById, calculateBaseComission, calculateServiceBonus, calculateEquipmentBonus} = require('../handlers/comissionHandler');

comissionRouter
.get('/all-comissions', getAllComissions)
.get('/comission/:id', getComissionById)
.post('/calculate-base-comission', calculateBaseComission)
.post('/calculate-service-bonus', calculateServiceBonus)
.post('/calculate-equipment-bonus', calculateEquipmentBonus);

module.exports = comissionRouter;
