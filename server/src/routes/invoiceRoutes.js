const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/invoices', invoiceController.createInvoice);
router.get('/invoices', invoiceController.getInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.put('/invoices/:id', invoiceController.updateInvoice);
router.put('/invoices/:id/status', invoiceController.updateInvoiceStatus);

module.exports = router; 