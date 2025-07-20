import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === 'admin' && form.password === 'admin') {
      onLogin(true);
    } else {
      setError('Invalid credentials. Try admin/admin.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" size="large">Login</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage; 