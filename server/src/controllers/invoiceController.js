const { Invoice, InvoiceItem, Client } = require('../models');

exports.createInvoice = async (req, res) => {
  try {
    const { issueDate, dueDate, clientId, items } = req.body;
    // Generate invoice number (simple: timestamp)
    const invoiceNumber = 'INV-' + Date.now();
    // Calculate total
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    // Create invoice
    const invoice = await Invoice.create({ invoiceNumber, issueDate, dueDate, clientId, total });
    // Create items
    const invoiceItems = await Promise.all(items.map(item => InvoiceItem.create({
      invoiceId: invoice.id,
      itemName: item.itemName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })));
    res.status(201).json({ invoice, items: invoiceItems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const invoices = await Invoice.findAll({
      where,
      include: [
        { model: Client, attributes: ['id', 'name'] },
      ],
      order: [['dueDate', 'ASC']],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: InvoiceItem },
      ],
    });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    const { issueDate, dueDate, clientId, status } = req.body;
    await invoice.update({ issueDate, dueDate, clientId, status });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInvoiceStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    const { status } = req.body;
    if (!['paid', 'unpaid'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    await invoice.update({ status });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 