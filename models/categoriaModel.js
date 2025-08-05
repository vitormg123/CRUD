// models/categoriaModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // conexão configurada com Sequelize

// Definição do modelo
const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categorias',
    timestamps: false // desativa createdAt/updatedAt
});

// Métodos no mesmo padrão do seu código original
const categoriaModel = {
    create: async (categoria, callback) => {
        try {
            const novaCategoria = await Categoria.create(categoria);
            callback(null, novaCategoria.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const categoria = await Categoria.findByPk(id);
            callback(null, categoria);
        } catch (err) {
            callback(err);
        }
    },

    findByCategorianame: async (nome, callback) => {
        try {
            const categoria = await Categoria.findOne({ where: { nome } });
            callback(null, categoria);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, categoria, callback) => {
        try {
            const resultado = await Categoria.update(categoria, { where: { id } });
            callback(null, resultado);
        } catch (err) {
            callback(err);
        }
    },

    delete: async (id, callback) => {
        try {
            const resultado = await Categoria.destroy({ where: { id } });
            callback(null, resultado);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (callback) => {
        try {
            const categorias = await Categoria.findAll();
            callback(null, categorias);
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = categoriaModel;
