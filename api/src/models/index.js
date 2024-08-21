const Sales = require('./Sales');
const User = require('./User');
const Comission = require('./Comission');

User.hasMany(Sales, {foreignKey: 'userId'});
Sales.belongsTo(User, {foreignKey: 'userId'});


Sales.hasMany(Comission, {foreignKey: 'salesId'});
Comission.belongsTo(Sales, {foreignKey: 'salesId'});

//module.exports = { Sales, User, Comission }; 