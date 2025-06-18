// routes/taskRoutes.js
import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

// Tambah task
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  try {
    const task = await Task.create({ title, userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Gagal menambah task:', error);
    res.status(500).json({ error: 'Gagal menambah task' });
  }
});

export default router;
