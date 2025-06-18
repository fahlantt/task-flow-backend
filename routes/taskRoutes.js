// routes/taskRoutes.js
import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ Ambil semua task user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(tasks);
  } catch (error) {
    console.error('Gagal mengambil task:', error);
    res.status(500).json({ error: 'Gagal mengambil task' });
  }
});

// ✅ Tambah task
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

// ✅ Update task (edit judul atau status)
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task tidak ditemukan' });
    }

    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json({ message: 'Task berhasil diperbarui', task });
  } catch (error) {
    console.error('Gagal update task:', error);
    res.status(500).json({ error: 'Gagal update task' });
  }
});

// ✅ Hapus task
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const deleted = await Task.destroy({ where: { id, userId } });
    if (!deleted) {
      return res.status(404).json({ error: 'Task tidak ditemukan' });
    }

    res.json({ message: 'Task berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus task:', error);
    res.status(500).json({ error: 'Gagal menghapus task' });
  }
});

export default router;
