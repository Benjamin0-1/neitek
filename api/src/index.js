const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const routes = require('./routes'); // 
const sequelize = require('./db');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const isAuthenticated = require('./middlewares/isAuthenticated');
const seedDatabase = require('./utils/seedDatabase')

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
));
app.use(bodyParser.json());
app.use(isAuthenticated);  // esto protegera todas las rutas, ya que no tendria sentido tener una ruta sin proteger en este caso.


app.use('/api', indexRoutes);

sequelize.sync({ force: true }).then(async () => {
    await seedDatabase();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

module.exports = app; 
