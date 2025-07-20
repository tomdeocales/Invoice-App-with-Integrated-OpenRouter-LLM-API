const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const aiQueryRoutes = require('./routes/aiQueryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', aiQueryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
