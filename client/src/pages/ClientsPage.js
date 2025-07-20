import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClientTable from '../components/ClientTable';
import ClientForm from '../components/ClientForm';
import { getClients, createClient, updateClient, deleteClient } from '../services/api';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load clients' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAdd = () => {
    setEditClient(null);
    setOpenForm(true);
  };

  const handleEdit = (client) => {
    setEditClient(client);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this client?')) {
      try {
        await deleteClient(id);
        setSnackbar({ open: true, message: 'Client deleted' });
        fetchClients();
      } catch {
        setSnackbar({ open: true, message: 'Delete failed' });
      }
    }
  };

  const handleFormSubmit = async (client) => {
    try {
      if (editClient) {
        await updateClient(editClient.id, client);
        setSnackbar({ open: true, message: 'Client updated' });
      } else {
        await createClient(client);
        setSnackbar({ open: true, message: 'Client added' });
      }
      setOpenForm(false);
      fetchClients();
    } catch {
      setSnackbar({ open: true, message: 'Save failed' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Clients</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mb: 2 }}>
        Add Client
      </Button>
      <ClientTable
        clients={clients}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ClientForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editClient}
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

export default ClientsPage; 