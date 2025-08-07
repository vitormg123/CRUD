// models/produtoModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel').Categoria || require('./categoriaModel'); // Ajusta conforme sua exportação

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id',
    },
    field: 'categoria' // se no banco o campo for 'categoria' e não 'categoriaId'
  }
}, {
  tableName: 'produtos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Relações
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });

module.exports = Produto;
