const Sales = require('../models/Sales');
const isValidMonth = require('../utils/isValidMonth');

const getAllSales = async (req, res) => {
   const userId = req.user.id; 
   try {
    
    const sales = await Sales.findAll({ where: { userId } });
    if (sales.length === 0) {
        return res.status(404).json({ error: 'No sales found' });
    }

    return res.json(sales);

   } catch (error) {
       return res.status(500).json({ error: error.message });
    
   };
};


const getSaleById = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const sale = await Sales.findOne({ where: { id, userId } });
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found or does not belong to you.' });
        }
        return res.json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createSale = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { month, serviceSales, equipmentSales, region } = req.body;

    if (!month || !serviceSales || !equipmentSales || !region) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isValidMonth(month)) {
        return res.status(400).json({ error: 'Invalid month' });
    }

    if (region.toLowerCase() !== 'north' && region.toLowerCase() !== 'south') {
        return res.status(400).json({ error: 'Invalid region' });
    }

    try {
        const totalSales = parseFloat(serviceSales) + parseFloat(equipmentSales);
        const newSale = await Sales.create({ month, serviceSales, equipmentSales, totalSales, userId, region: region.toLowerCase() });
        res.status(201).json({ message: 'Sale created successfully', sale: newSale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// esta ruta calculará la comisión para una venta específica según su id.
const calculateComission = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        
        const sale = await Sales.findOne({ where: {id, userId } });
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found or does not belong to you' });
        };

        // esta es la comision base.
        const baseComissionRate =  sale.region === 'north' ? 0.02 : 0.25; 
        const baseComission = parseFloat(sale.totalSales) * baseComissionRate; 

        // para calcular el bonus servicio se require 3 meses de ventas.
        const previousSales = await Sales.findAll({
            where: { userId: sale.userId, month: { [sequelize.Op.ne]: sale.month } }, 
            limit: 3,
            order: [['month', 'DESC']]
        });

        const averageServiceSales = previousSales.reduce((total, prevSale) => total + parseFloat(prevSale.serviceSales), 0) / previousSales.length;
        const serviceBonusPercentage = parseFloat(sale.serviceSales) / averageServiceSales * 100;

        let serviceBonus = 0;

        switch (true) {
            case serviceBonusPercentage >= 101 && serviceBonusPercentage < 110:
                serviceBonus = 200;
                break;
            case serviceBonusPercentage >= 110 && serviceBonusPercentage < 120:
                serviceBonus = 250;
                break;
            case serviceBonusPercentage >= 120:
                serviceBonus = 275;
                break;
        }

        const equipmentSales = parseFloat(sale.equipmentSales); 
        let equipmentBonus = 0;

        switch (true) {
            case equipmentSales > 0 && equipmentSales < 250000:
                equipmentBonus = equipmentSales * 0.0025;
                break;
            case equipmentSales <= 350000:
                equipmentBonus = 250000 * 0.0025 + 50000 * 0.005 + (equipmentSales - 300000) * 0.015;
                break;
            case equipmentSales <= 450000:
                equipmentBonus = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + (equipmentSales - 350000) * 0.02;
                break;
            case equipmentSales <= 750000:
                equipmentBonus = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + 100000 * 0.02 + (equipmentSales - 450000) * 0.025;
                break;
            case equipmentSales <= 1000000:
                equipmentBonus = 250000 * 0.0025 + 50000 * 0.005 + 50000 * 0.015 + 100000 * 0.02 + 300000 * 0.025 + (equipmentSales - 750000) * 0.04;
                break;
        }

        const totalComission = baseComission + serviceBonus + equipmentBonus;

        sale.commision = totalComission;
        await sale.save();

        return res.json({
            ...sale.toJSON(),
            baseComission,
            serviceBonus,
            equipmentBonus,
            totalComission
        });


    } catch (error) {
        return  res.status(500).json({ message: error.message });
    };
};



module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    calculateComission
};
