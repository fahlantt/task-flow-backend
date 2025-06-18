import express from 'express';
import db from '../db.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

// Ambil semua tanggal penting milik user dari token
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id; // userId dari token
  try {
    const [rows] = await db.execute(
      'SELECT date, description FROM important_dates WHERE user_id = ?',
      [userId]
    );

    const result = {};
    rows.forEach(row => {
      result[row.date] = row.description;
    });

    res.json(result);
  } catch (error) {
    console.error('Gagal ambil tanggal penting:', error);
    res.status(500).json({ error: 'Gagal ambil tanggal penting' });
  }
});

// Tambah tanggal penting baru
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date, description } = req.body;
  try {
    await db.execute(
      'INSERT INTO important_dates (user_id, date, description) VALUES (?, ?, ?)',
      [userId, date, description]
    );
    res.status(201).json({ message: 'Tanggal penting ditambahkan' });
  } catch (error) {
    console.error('Gagal tambah tanggal penting:', error);
    res.status(500).json({ error: 'Gagal tambah tanggal penting' });
  }
});

// Update deskripsi tanggal penting berdasarkan userId dan tanggal
router.put('/:date', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date } = req.params;
  const { description } = req.body;
  try {
    await db.execute(
      'UPDATE important_dates SET description = ? WHERE user_id = ? AND date = ?',
      [description, userId, date]
    );
    res.json({ message: 'Tanggal penting diubah' });
  } catch (error) {
    console.error('Gagal update tanggal penting:', error);
    res.status(500).json({ error: 'Gagal update tanggal penting' });
  }
});

// Hapus tanggal penting berdasarkan userId dan tanggal
router.delete('/:date', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date } = req.params;
  try {
    await db.execute(
      'DELETE FROM important_dates WHERE user_id = ? AND date = ?',
      [userId, date]
    );
    res.json({ message: 'Tanggal penting dihapus' });
  } catch (error) {
    console.error('Gagal hapus tanggal penting:', error);
    res.status(500).json({ error: 'Gagal hapus tanggal penting' });
  }
});

export default router;
