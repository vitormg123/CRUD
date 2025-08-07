// models/usuariosModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

const usuarioModel = {
  create: async (usuario, callback) => {
    try {
      const novoUsuario = await Usuario.create(usuario);
      callback(null, novoUsuario.id);
    } catch (err) {
      callback(err);
    }
  },

  findById: async (id, callback) => {
    try {
      const usuario = await Usuario.findByPk(id);
      callback(null, usuario);
    } catch (err) {
      callback(err);
    }
  },

  findByUsuarioname: async (usuarioname, callback) => {
    try {
      const usuario = await Usuario.findOne({ where: { usuarioname } });
      callback(null, usuario);
    } catch (err) {
      callback(err);
    }
  },

  update: async (id, usuario, callback) => {
    try {
      const resultado = await Usuario.update(usuario, { where: { id } });
      callback(null, resultado);
    } catch (err) {
      callback(err);
    }
  },

  delete: async (id, callback) => {
    try {
      const resultado = await Usuario.destroy({ where: { id } });
      callback(null, resultado);
    } catch (err) {
      callback(err);
    }
  },

  getAll: async (callback) => {
    try {
      const usuarios = await Usuario.findAll();
      callback(null, usuarios);
    } catch (err) {
      callback(err);
    }
  },

  searchByName: async (name, callback) => {
    try {
      const usuarios = await Usuario.findAll({
        where: {
          usuarioname: {
            [require('sequelize').Op.like]: `%${name}%`
          }
        }
      });
      callback(null, usuarios);
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = usuarioModel;
