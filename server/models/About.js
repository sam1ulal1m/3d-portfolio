const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
