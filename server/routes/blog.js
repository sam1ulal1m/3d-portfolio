const express = require('express');
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create blog post (admin only)
router.post('/', auth, async (req, res) => {
  const post = new BlogPost(req.body);
  await post.save();
  res.status(201).json(post);
});

// Update blog post (admin only)
router.put('/:id', auth, async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// Delete blog post (admin only)
router.delete('/:id', auth, async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
