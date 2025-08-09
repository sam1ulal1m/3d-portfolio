const express = require('express');
const About = require('../models/About');
const auth = require('../middleware/auth');

const router = express.Router();

// Get about content
router.get('/', async (req, res) => {
  const about = await About.findOne().sort({ createdAt: -1 });
  res.json(about);
});

// Update about (admin only)
router.put('/', auth, async (req, res) => {
  const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(about);
});

module.exports = router;
