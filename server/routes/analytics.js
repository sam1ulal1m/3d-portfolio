const express = require('express');
const Analytics = require('../models/Analytics');
const auth = require('../middleware/auth');

const router = express.Router();

// Get analytics (admin only)
router.get('/', auth, async (req, res) => {
  const { type, page } = req.query;
  const query = {};
  if (type) query.type = type;
  if (page) query.page = page;
  const analytics = await Analytics.find(query).sort({ createdAt: -1 });
  res.json(analytics);
});

module.exports = router;
