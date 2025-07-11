import express from 'express';
import QueueEntry from '../models/QueueEntry.js';

const router = express.Router();

// GET all queue items
router.get('/', async (req, res) => {
  try {
    const items = await QueueEntry.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new queue item
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new QueueEntry({ name });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete("/:id", async (req, res) => {
  await QueueEntry.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
