const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST
const user = process.env.DB_USERNAME
const database = process.env.DB_NAME
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  logging: false
});

(async () => {
  try {
    console.clear();
    await sequelize.authenticate();
    console.log('\nMySQL contectado correctamente');
    console.log("*******************************************");
    await sequelize.sync();
  } catch (error) {
    console.error('Error al conectar y sincronizar el modelo:', error);
  }
})();

module.exports = sequelize;