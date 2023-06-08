const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const usuario = require('./usuario');
const tarea = sequelize.define('tarea', {
  titulo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  dificultad: {
    type: DataTypes.INTEGER,
  },
  estado: {
    type: DataTypes.STRING,
  },
  IdUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    allowNull: false
  }
});
module.exports = tarea;
