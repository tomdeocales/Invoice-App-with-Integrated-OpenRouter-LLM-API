const Client = require('./Client');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');

// Schema
Client.hasMany(Invoice, { foreignKey: 'clientId' });
Invoice.belongsTo(Client, { foreignKey: 'clientId' });
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId' });

module.exports = {
  Client,
  Invoice,
  InvoiceItem,
}; 