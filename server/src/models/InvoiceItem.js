const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'invoices',
      key: 'id',
    },
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'invoice_items',
  timestamps: false,
});

module.exports = InvoiceItem; 