const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 

  const db ={};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = require('./user')(sequelize, DataTypes, Model);
  db.contact = require('./contact')(sequelize, DataTypes);

  db.sequelize.sync({ force: false });
  module.exports = db;