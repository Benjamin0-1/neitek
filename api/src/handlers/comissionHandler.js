const Comission = require('../models/Comission');

// comision mensual base.
const calculateBaseComission = async (req, res) => {
    const {sales, region} = req.body;
    
    if (!sales || !region) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (region.toLowerCase() !== 'north' && region.toLowerCase() !== 'south') { 
        return res.status(400).json({ error: 'Invalid region' });
    };

    try {
        
        let baseComissionRate;

        if (region.toLowerCase() === 'north') {
            baseComissionRate = 0.02;
        }

        if (region.toLowerCase() === 'south') {
            baseComissionRate = 0.025;
        } 

        const baseComission = sales * baseComissionRate;
        res.json({ baseComission });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Bono mensual por ventas de servicios.
const calculateServiceBonus = async (req, res) => {
    const { currentMonthSales, lastThreeMonthsSales } = req.body;

    if (!currentMonthSales || !lastThreeMonthsSales) {
        return res.status(400).json({ error: 'Current month sales and last three months sales are required' });
    }

    // Calculate the average of the available sales data
    const totalSales = lastThreeMonthsSales.reduce((acc, sales) => acc + sales, 0);
    const numOfMonths = lastThreeMonthsSales.length;
    const averageSales = numOfMonths > 0 ? totalSales / numOfMonths : 0;

    let bonusLevel, bonusAmount;
    const salesIncrease = averageSales > 0 ? currentMonthSales / averageSales : 1;

    switch (true) {
        case salesIncrease >= 1.01 && salesIncrease < 1.10: // si las ventas aumentan entre 1% y 10%
            bonusLevel = 1;
            bonusAmount = 200;
            break;
        case salesIncrease >= 1.10 && salesIncrease < 1.20: // si las ventas aumentan entre 10% y 20%
            bonusLevel = 2;
            bonusAmount = 250;
            break;
        case salesIncrease >= 1.20: // si las ventas aumentan más del 20%
            bonusLevel = 3;
            bonusAmount = 275;
            break;
        default:
            bonusLevel = 0;
            bonusAmount = 0;
            break;
    }

    res.json({
        bonusLevel,
        bonusAmount,
    });
};

//Bono Mensual por Ventas de Equipos
const calculateEquipmentBonus = async (req, res) => {
    const { equipmentSales } = req.body;
    if (!equipmentSales) {
        return res.status(400).json({ error: 'Equipment sales are required' });
    }

    let bonusAmount;
    switch (true) {
        case equipmentSales >= 0 && equipmentSales <= 250000: // si las ventas de equipos son menores o iguales a $250,000
            bonusAmount = equipmentSales * 0.0025;
            break;
        case equipmentSales > 250000 && equipmentSales <= 300000: // si las ventas de equipos son mayores a $250,000 y menores o iguales a $300,000
            bonusAmount = 250000 * 0.0025 + (equipmentSales - 250000) * 0.005; // la comision seria el 0.5% de las ventas de equipos
            break;
        case equipmentSales > 300000 && equipmentSales <= 350000: // si las ventas de equipos son mayores a $300,000 y menores o iguales a $350,000
            bonusAmount = 250000 * 0.0025 + 50000 * 0.005 + (equipmentSales - 300000) * 0.015; // la comision seria el 1.5% de las ventas de equipos
            break;
        case equipmentSales > 350000 && equipmentSales <= 450000: // si las ventas de equipos son mayores a $350,000 y menores o iguales a $450,000
            bonusAmount = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + (equipmentSales - 350000) * 0.02; // la comision seria el 2% de las ventas de equipos
            break;
        case equipmentSales > 450000 && equipmentSales <= 750000: // si las ventas de equipos son mayores a $450,000 y menores o iguales a $750,000
            bonusAmount = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + 100000 * 0.02 + (equipmentSales - 450000) * 0.025; // la comision seria el 2.5% de las ventas de equipos
            break;
        case equipmentSales > 750000 && equipmentSales <= 1000000: // si las ventas de equipos son mayores a $750,000 y menores o iguales a $1,000,000
            bonusAmount = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + 100000 * 0.02 + 300000 * 0.025 + (equipmentSales - 750000) * 0.04; // la comision seria el 4% de las ventas de equipos
            break;
        default:
            bonusAmount = 0;
            break;
    }

    res.json({
        bonusAmount,
    });
};


 
const getAllComissions = async (req, res) => {
    try {
        const comissions = await Comission.findAll();
        if (comissions.length === 0) {
            return res.status(404).json({ error: 'No comissions found' });
        }
        res.json(comissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getComissionById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const comission = await Comission.findByPk(id);
        if (!comission) {
            return res.status(404).json({ error: 'Comission not found' });
        }
        return res.json(comission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllComissions,
    getComissionById,
    calculateBaseComission,
    calculateServiceBonus,
    calculateEquipmentBonus
};

