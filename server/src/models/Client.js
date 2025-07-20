const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const cors = require('cors');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  billingAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = Client; 