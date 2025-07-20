const { Client } = require('../models');

exports.createClient = async (req, res) => {
  try {
    const { name, contactInfo, billingAddress } = req.body;
    const client = await Client.create({ name, contactInfo, billingAddress });
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    const { name, contactInfo, billingAddress } = req.body;
    await client.update({ name, contactInfo, billingAddress });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await client.destroy();
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 