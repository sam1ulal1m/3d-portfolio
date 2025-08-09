const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'visit', 'impression'
  page: { type: String },
  userAgent: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
