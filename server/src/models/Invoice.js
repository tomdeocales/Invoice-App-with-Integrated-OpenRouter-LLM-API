const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  issueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('paid', 'unpaid'),
    defaultValue: 'unpaid',
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id',
    },
  },
}, {
  tableName: 'invoices',
  timestamps: false,
});

module.exports = Invoice; 