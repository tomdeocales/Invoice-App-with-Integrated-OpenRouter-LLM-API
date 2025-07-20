import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Snackbar, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InvoiceTable from '../components/InvoiceTable';
import InvoiceForm from '../components/InvoiceForm';
import { getInvoices, createInvoice, updateInvoiceStatus, getClients } from '../services/api';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices(statusFilter !== 'all' ? statusFilter : undefined);
      setInvoices(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load invoices' });
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch {}
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line
  }, [statusFilter]);

  const handleAdd = () => {
    setOpenForm(true);
  };

  const handleMarkStatus = async (id, status) => {
    try {
      await updateInvoiceStatus(id, status);
      setSnackbar({ open: true, message: `Marked as ${status}` });
      fetchInvoices();
    } catch {
      setSnackbar({ open: true, message: 'Status update failed' });
    }
  };

  const handleFormSubmit = async (invoice) => {
    try {
      await createInvoice(invoice);
      setSnackbar({ open: true, message: 'Invoice created' });
      setOpenForm(false);
      fetchInvoices();
    } catch {
      setSnackbar({ open: true, message: 'Save failed' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Invoices</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mb: 2 }}>
        Create Invoice
      </Button>
      <Tabs
        value={statusFilter}
        onChange={(_, v) => setStatusFilter(v)}
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Paid" value="paid" />
        <Tab label="Unpaid" value="unpaid" />
      </Tabs>
      <InvoiceTable
        invoices={invoices}
        loading={loading}
        onMarkStatus={handleMarkStatus}
      />
      <InvoiceForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        clients={clients}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default InvoicesPage; 