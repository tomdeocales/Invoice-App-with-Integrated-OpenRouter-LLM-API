import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress, IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Invoice', 14, 18);
  doc.setFontSize(12);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 30);
  doc.text(`Client: ${invoice.Client?.name || ''}`, 14, 38);
  doc.text(`Due Date: ${invoice.dueDate}`, 14, 46);
  doc.text(`Status: ${invoice.status}`, 14, 54);
  doc.text(`Total: $${Number(invoice.total).toFixed(2)}`, 14, 62);

  if (invoice.InvoiceItems && invoice.InvoiceItems.length > 0) {
    doc.autoTable({
      startY: 70,
      head: [['Item Name', 'Quantity', 'Unit Price', 'Total']],
      body: invoice.InvoiceItems.map(item => [
        item.itemName,
        item.quantity,
        `$${Number(item.unitPrice).toFixed(2)}`,
        `$${(item.quantity * item.unitPrice).toFixed(2)}`
      ]),
    });
  }

  doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
};

const InvoiceTable = ({ invoices, loading, onMarkStatus }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Invoice #</TableCell>
          <TableCell>Client</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        ) : invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} align="center">No invoices found.</TableCell>
          </TableRow>
        ) : (
          invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.invoiceNumber}</TableCell>
              <TableCell>{inv.Client?.name || ''}</TableCell>
              <TableCell>{inv.dueDate}</TableCell>
              <TableCell>${Number(inv.total).toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={inv.status}
                  color={inv.status === 'paid' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                {inv.status === 'unpaid' ? (
                  <Button size="small" color="success" onClick={() => onMarkStatus(inv.id, 'paid')}>Mark Paid</Button>
                ) : (
                  <Button size="small" color="warning" onClick={() => onMarkStatus(inv.id, 'unpaid')}>Mark Unpaid</Button>
                )}
                <Tooltip title="Download PDF">
                  <IconButton onClick={async () => {
                    // Fetch full invoice with items for PDF
                    if (!inv.InvoiceItems) {
                      // fallback: fetch by id if not present
                      const res = await fetch(`http://localhost:5000/api/invoices/${inv.id}`);
                      const fullInv = await res.json();
                      generateInvoicePDF(fullInv);
                    } else {
                      generateInvoicePDF(inv);
                    }
                  }}>
                    <PictureAsPdfIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default InvoiceTable; 