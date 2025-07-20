import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const AIQueryPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('');
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai-query', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setError('AI query failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>AI-Powered Query</Typography>
        <Typography variant="body1" gutterBottom>
          Ask a question about your clients or invoices (e.g., "Which clients are at risk of churn?")
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <TextField
              label="Your question"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
            <Button type="submit" variant="contained" disabled={loading || !question}>
              {loading ? <CircularProgress size={24} /> : 'Ask'}
            </Button>
          </Box>
        </form>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {answer && (
          <Paper elevation={1} sx={{ p: 2, mt: 2, background: '#f5f5f5' }}>
            <Typography variant="subtitle1">AI Answer:</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{answer}</Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default AIQueryPage; 