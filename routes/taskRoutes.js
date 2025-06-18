// backend/routes/taskRoutes.js
import express from 'express';
import db from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Ambil semua task milik user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.execute(
      'SELECT id, title, is_completed, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Gagal ambil tasks:', error);
    res.status(500).json({ error: 'Gagal ambil tasks' });
  }
});

// Tambah task baru
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Judul tugas tidak boleh kosong' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO tasks (user_id, title) VALUES (?, ?)',
      [userId, title.trim()]
    );

    const [newTaskRows] = await db.execute(
      'SELECT id, title, is_completed, created_at FROM tasks WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newTaskRows[0]);
  } catch (error) {
    console.error('Gagal tambah task:', error);
    res.status(500).json({ error: 'Gagal tambah task' });
  }
});

// Update judul tugas
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?',
      [title, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task tidak ditemukan' });
    }

    res.json({ message: 'Task diperbarui' });
  } catch (error) {
    console.error('Gagal update task:', error);
    res.status(500).json({ error: 'Gagal update task' });
  }
});

// Tandai selesai
router.patch('/:id/complete', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await db.execute(
      'UPDATE tasks SET is_completed = TRUE WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    res.json({ message: 'Task ditandai selesai' });
  } catch (error) {
    console.error('Gagal tandai selesai:', error);
    res.status(500).json({ error: 'Gagal update task' });
  }
});

// Batalkan selesai
router.patch('/:id/undo', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await db.execute(
      'UPDATE tasks SET is_completed = FALSE WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    res.json({ message: 'Status selesai dibatalkan' });
  } catch (error) {
    console.error('Gagal undo task:', error);
    res.status(500).json({ error: 'Gagal undo task' });
  }
});

// Hapus task
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task tidak ditemukan' });
    }

    res.json({ message: 'Task dihapus' });
  } catch (error) {
    console.error('Gagal hapus task:', error);
    res.status(500).json({ error: 'Gagal hapus task' });
  }
});

export default router;
