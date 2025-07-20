import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// CLIENTS
export const getClients = async () => {
  const res = await api.get('/clients');
  return res.data;
};

export const createClient = async (client) => {
  const res = await api.post('/clients', client);
  return res.data;
};

export const updateClient = async (id, client) => {
  const res = await api.put(`/clients/${id}`, client);
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await api.delete(`/clients/${id}`);
  return res.data;
};

// INVOICES
export const getInvoices = async (status) => {
  const res = await api.get('/invoices', { params: status ? { status } : {} });
  return res.data;
};

export const createInvoice = async (invoice) => {
  const res = await api.post('/invoices', invoice);
  return res.data;
};

export const updateInvoice = async (id, invoice) => {
  const res = await api.put(`/invoices/${id}`, invoice);
  return res.data;
};

export const updateInvoiceStatus = async (id, status) => {
  const res = await api.put(`/invoices/${id}/status`, { status });
  return res.data;
};

export const getInvoiceById = async (id) => {
  const res = await api.get(`/invoices/${id}`);
  return res.data;
}; 