// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nome do banco
    process.env.DB_USER, // Usuário
    process.env.DB_PASSWORD, // Senha
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // deixa falso para não encher o console de SQLs
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the MySQL database with Sequelize.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
