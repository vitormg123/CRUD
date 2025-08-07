const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');

// Fazer as associações, caso não estejam feitas nos models individualmente
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });

module.exports = {
  sequelize,
  Categoria,
  Produto
};
