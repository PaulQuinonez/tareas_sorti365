const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const tarea = require('./tarea');
const usuario = sequelize.define('usuario', {
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  cedula: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

usuario.associate = (models) => {
  usuario.hasMany(models.tarea, {
    foreignKey: 'id',
  });
};

module.exports = usuario;
