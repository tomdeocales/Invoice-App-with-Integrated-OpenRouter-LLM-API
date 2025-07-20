const express = require('express');
const router = express.Router();
const aiQueryController = require('../controllers/aiQueryController');

router.post('/ai-query', aiQueryController.handleAIQuery);

module.exports = router; 