import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, IconButton, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const emptyItem = { itemName: '', quantity: 1, unitPrice: 0 };
const initialForm = {
  issueDate: '',
  dueDate: '',
  clientId: '',
  items: [ { ...emptyItem } ]
};

const InvoiceForm = ({ open, onClose, onSubmit, clients }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setErrors({});
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (idx, e) => {
    const items = form.items.map((item, i) =>
      i === idx ? { ...item, [e.target.name]: e.target.value } : item
    );
    setForm({ ...form, items });
  };

  const handleAddItem = () => {
    setForm({ ...form, items: [ ...form.items, { ...emptyItem } ] });
  };

  const handleRemoveItem = (idx) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
  };

  const validate = () => {
    const errs = {};
    if (!form.issueDate) errs.issueDate = 'Required';
    if (!form.dueDate) errs.dueDate = 'Required';
    if (!form.clientId) errs.clientId = 'Required';
    if (!form.items.length) errs.items = 'At least one item required';
    form.items.forEach((item, idx) => {
      if (!item.itemName) errs[`itemName${idx}`] = 'Required';
      if (!item.quantity || item.quantity <= 0) errs[`quantity${idx}`] = 'Must be > 0';
      if (!item.unitPrice || item.unitPrice < 0) errs[`unitPrice${idx}`] = 'Must be >= 0';
    });
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({
        ...form,
        clientId: Number(form.clientId),
        items: form.items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice)
        }))
      });
    }
  };

  const total = form.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Invoice</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              value={form.issueDate}
              onChange={handleChange}
              error={!!errors.issueDate}
              helperText={errors.issueDate}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              error={!!errors.dueDate}
              helperText={errors.dueDate}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              select
              label="Client"
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              error={!!errors.clientId}
              helperText={errors.clientId}
              required
            >
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Items</Typography>
              {form.items.map((item, idx) => (
                <Box key={idx} display="flex" gap={1} alignItems="center" mb={1}>
                  <TextField
                    label="Item Name"
                    name="itemName"
                    value={item.itemName}
                    onChange={e => handleItemChange(idx, e)}
                    error={!!errors[`itemName${idx}`]}
                    helperText={errors[`itemName${idx}`]}
                    required
                  />
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={e => handleItemChange(idx, e)}
                    error={!!errors[`quantity${idx}`]}
                    helperText={errors[`quantity${idx}`]}
                    required
                    sx={{ width: 100 }}
                  />
                  <TextField
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    value={item.unitPrice}
                    onChange={e => handleItemChange(idx, e)}
                    error={!!errors[`unitPrice${idx}`]}
                    helperText={errors[`unitPrice${idx}`]}
                    required
                    sx={{ width: 120 }}
                  />
                  <IconButton onClick={() => handleRemoveItem(idx)} disabled={form.items.length === 1}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddItem} sx={{ mt: 1 }}>
                Add Item
              </Button>
              {errors.items && <Typography color="error">{errors.items}</Typography>}
            </Box>
            <Typography variant="h6" align="right">Total: ${total.toFixed(2)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InvoiceForm; 