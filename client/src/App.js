import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Tooltip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ClientsPage from './pages/ClientsPage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AIQueryPage from './pages/AIQueryPage';

const AppContent = ({ onLogout, darkMode, toggleDarkMode }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Invoice App
        </Typography>
        <Button color="inherit" component={Link} to="/clients">Clients</Button>
        <Button color="inherit" component={Link} to="/invoices">Invoices</Button>
        <Button color="inherit" component={Link} to="/ai-query">AI Query</Button>
        <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/ai-query" element={<AIQueryPage />} />
        <Route path="*" element={<Navigate to="/clients" replace />} />
      </Routes>
    </Container>
  </>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isLoggedIn ? (
          <AppContent onLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
