// routes/taskRoutes.js
import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ Ambil semua task milik user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    console.error('Gagal mengambil task:', error);
    res.status(500).json({ error: 'Gagal mengambil task' });
  }
});

// ✅ Tambah task baru
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
