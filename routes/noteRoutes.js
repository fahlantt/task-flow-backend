// backend/routes/noteRoutes.js
import express from 'express';
import db from '../db.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Ambil semua catatan user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.execute(
      'SELECT id, content, created_at FROM notes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Gagal mengambil catatan:', error);
    res.status(500).json({ error: 'Gagal mengambil catatan' });
  }
});

// Tambah catatan baru
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Isi catatan tidak boleh kosong' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO notes (user_id, content) VALUES (?, ?)',
      [userId, content]
    );

    // Ambil catatan yang baru dimasukkan
    const [newNoteRows] = await db.execute(
      'SELECT id, content, created_at FROM notes WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newNoteRows[0]);
  } catch (error) {
    console.error('Gagal menambahkan catatan:', error);
    res.status(500).json({ error: 'Gagal menambahkan catatan' });
  }
});

// Edit catatan
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { content } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE notes SET content = ? WHERE id = ? AND user_id = ?',
      [content, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan atau bukan milik Anda' });
    }

    res.json({ message: 'Catatan berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal mengedit catatan:', error);
    res.status(500).json({ error: 'Gagal mengedit catatan' });
  }
});

// Hapus catatan
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM notes WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan atau bukan milik Anda' });
    }

    res.json({ message: 'Catatan berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus catatan:', error);
    res.status(500).json({ error: 'Gagal menghapus catatan' });
  }
});

export default router;
