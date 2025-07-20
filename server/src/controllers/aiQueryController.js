const { Client, Invoice, InvoiceItem } = require('../models');

exports.handleAIQuery = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    // Fetch relevant data
    const clients = await Client.findAll({ raw: true });
    const invoices = await Invoice.findAll({ raw: true });
    const invoiceItems = await InvoiceItem.findAll({ raw: true });

    // Prepare data summary (truncate for token limit)
    const dataSummary = `Clients: ${JSON.stringify(clients).slice(0, 2000)}\nInvoices: ${JSON.stringify(invoices).slice(0, 2000)}\nInvoiceItems: ${JSON.stringify(invoiceItems).slice(0, 2000)}`;

    // Compose prompt
    const prompt = `You are an expert business analyst. Given the following data, answer the user's question.\n\n${dataSummary}\n\nUser question: ${question}`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // or your deployed app URL
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // or another model from OpenRouter
        messages: [
          { role: 'system', content: 'You are a helpful assistant for business analytics.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 400,
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenRouter API error');
    }

    const answer = data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI query failed' });
  }
};