const express = require('express');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

// Create skill (admin only)
router.post('/', auth, async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.status(201).json(skill);
});

// Update skill (admin only)
router.put('/:id', auth, async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(skill);
});

// Delete skill (admin only)
router.delete('/:id', auth, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
