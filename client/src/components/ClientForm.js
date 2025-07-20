import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';

const initialForm = { name: '', contactInfo: '', billingAddress: '' };

const ClientForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData || initialForm);
    setErrors({});
  }, [open, initialData]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Client' : 'Add Client'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
            />
            <TextField
              label="Contact Info"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Billing Address"
              name="billingAddress"
              value={form.billingAddress}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientForm; 