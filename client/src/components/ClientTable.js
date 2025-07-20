import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientTable = ({ clients, loading, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Contact Info</TableCell>
          <TableCell>Billing Address</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        ) : clients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">No clients found.</TableCell>
          </TableRow>
        ) : (
          clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.contactInfo}</TableCell>
              <TableCell>{client.billingAddress}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(client)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => onDelete(client.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ClientTable; 