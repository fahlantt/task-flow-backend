
// backend/routes/noteRoutes.js
import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import Note from '../models/Note.js';

const router = express.Router();

// ✅ Ambil semua catatan milik user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(notes);
  } catch (error) {
    console.error('Gagal mengambil catatan:', error);
    res.status(500).json({ error: 'Gagal mengambil catatan' });
  }
});

// ✅ Tambah catatan baru
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Isi catatan tidak boleh kosong' });
  }
  try {
    const note = await Note.create({
      userId: req.user.id,
      content
    });
    res.status(201).json(note);
  } catch (error) {
    console.error('Gagal menambahkan catatan:', error);
    res.status(500).json({ error: 'Gagal menambahkan catatan' });
  }
});

// ✅ Edit catatan
router.put('/:id', authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan atau bukan milik Anda' });
    }
    note.content = content;
    await note.save();
    res.json({ message: 'Catatan berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal mengedit catatan:', error);
    res.status(500).json({ error: 'Gagal mengedit catatan' });
  }
});

// ✅ Hapus catatan
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Note.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan atau bukan milik Anda' });
    }
    res.json({ message: 'Catatan berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus catatan:', error);
    res.status(500).json({ error: 'Gagal menghapus catatan' });
  }
});

export default router;
