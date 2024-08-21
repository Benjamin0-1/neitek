const sequelize = require('../db');
const User = require('../models/User');
const Sales = require('../models/Sales');
const Comission = require('../models/Comission');

const seedDatabase = async () => {
    try {
        const userCount = await User.count();
        const salesCount = await Sales.count();
        const comissionCount = await Comission.count();

        if (userCount === 0) {
            await User.bulkCreate([
                { firstName: 'pepe', lastName: 'Ramirez', email: 'user1@example.com', passwordHash: 'password123', name: 'User One' },
                { firstName: 'gonzalo', lastName: 'guitirrez', email: 'user2@example.com', passwordHash: 'password123', name: 'User Two' },
            ], { updateOnDuplicate: ['firstName', 'lastName', 'passwordHash', 'name'] });
            console.log('Sample users inserted');
        }

        if (salesCount === 0) {
            await Promise.all([
                Sales.upsert({ userId: 1, amount: 1000, month: 'March', date: new Date(), region: 'north', serviceSales: 500, equipmentSales: 500, totalSales: 1000, comission: 100 }), 
                Sales.upsert({ userId: 2, amount: 2000, month: 'April', date: new Date(), region: 'south', serviceSales: 1000, equipmentSales: 1000, totalSales: 2000, comission: 200 }),
                Sales.upsert({ userId: 1, amount: 3000, month: 'May', date: new Date(), region: 'north', serviceSales: 1500, equipmentSales: 1500, totalSales: 3000, comission: 300 }),
                Sales.upsert({ userId: 2, amount: 4000, month: 'June', date: new Date(), region: 'south', serviceSales: 2000, equipmentSales: 2000, totalSales: 4000, comission: 400 }),
                Sales.upsert({ userId: 1, amount: 5000, month: 'July', date: new Date(), region: 'north', serviceSales: 2500, equipmentSales: 2500, totalSales: 5000, comission: 500 }),
                Sales.upsert({ userId: 2, amount: 6000, month: 'August', date: new Date(), region: 'south', serviceSales: 3000, equipmentSales: 3000, totalSales: 6000, comission: 600 }),
            ]);
            console.log('Sample sales inserted');
        }

        if (comissionCount === 0) {
            await Promise.all([
                Comission.upsert({ month: '2024-08', baseComission: 50.00, serviceBonus: 100.00, equipmentBonus: 150.00, totalComission: 300.00, userId: 1, salesId: 1 }),
                Comission.upsert({ month: '2024-08', baseComission: 60.00, serviceBonus: 120.00, equipmentBonus: 180.00, totalComission: 360.00, userId: 2, salesId: 2 }),
                Comission.upsert({ month: '2024-08', baseComission: 70.00, serviceBonus: 140.00, equipmentBonus: 210.00, totalComission: 420.00, userId: 1, salesId: 1 }),
            
            ]);
            console.log('Sample commissions inserted');
        }

        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } 
};

module.exports = seedDatabase;
