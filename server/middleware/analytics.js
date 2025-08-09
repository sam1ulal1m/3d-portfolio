const Analytics = require('../models/Analytics');

async function analyticsMiddleware(req, res, next) {
  try {
    await Analytics.create({
      type: 'visit',
      page: req.originalUrl,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
  } catch (err) {
    // Log error but don't block request
    console.error('Analytics error:', err);
  }
  next();
}

module.exports = analyticsMiddleware;
