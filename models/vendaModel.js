// models/vendaModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Produto = require('./produtoModel'); // Importa o model de Produto

const Venda = sequelize.define('Venda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'vendas',
    timestamps: false
});

// Relacionamento com Produto
Venda.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtoInfo' });

const vendaModel = {
    create: async (venda, callback) => {
        try {
            const novaVenda = await Venda.create(venda);
            callback(null, novaVenda.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const venda = await Venda.findByPk(id, {
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
            callback(null, venda);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (callback) => {
        try {
            const vendas = await Venda.findAll({
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
            callback(null, vendas);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, vendaData, callback) => {
        try {
            const resultado = await Venda.update(vendaData, { where: { id } });
            callback(null, resultado);
        } catch (err) {
            callback(err);
        }
    },

    delete: async (id, callback) => {
        try {
            const resultado = await Venda.destroy({ where: { id } });
            callback(null, resultado);
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = vendaModel;
