const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({ message: 'Message received' });
});

module.exports = router;
