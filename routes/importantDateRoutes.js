import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import ImportantDate from '../models/ImportantDate.js';

const router = express.Router();

// 🔹 Ambil semua tanggal penting milik user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const dates = await ImportantDate.findAll({
      where: { userId },
      attributes: ['date', 'description'],
      order: [['date', 'ASC']],
    });

    // Format jadi { '2025-06-20': 'Ulang Tahun', ... }
    const result = {};
    dates.forEach(date => {
      result[date.date] = date.description;
    });

    res.json(result);
  } catch (error) {
    console.error('Gagal ambil tanggal penting:', error);
    res.status(500).json({ error: 'Gagal ambil tanggal penting' });
  }
});

// 🔹 Tambah tanggal penting baru
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date, description } = req.body;

  try {
    const existing = await ImportantDate.findOne({ where: { userId, date } });
    if (existing) {
      return res.status(400).json({ error: 'Tanggal ini sudah ada catatannya.' });
    }

    await ImportantDate.create({ userId, date, description });
    res.status(201).json({ message: 'Tanggal penting ditambahkan' });
  } catch (error) {
    console.error('Gagal tambah tanggal penting:', error);
    res.status(500).json({ error: 'Gagal tambah tanggal penting' });
  }
});

// 🔹 Edit deskripsi tanggal penting
router.put('/:date', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date } = req.params;
  const { description } = req.body;

  try {
    const updated = await ImportantDate.update(
      { description },
      { where: { userId, date } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Tanggal tidak ditemukan' });
    }

    res.json({ message: 'Tanggal penting diubah' });
  } catch (error) {
    console.error('Gagal update tanggal penting:', error);
    res.status(500).json({ error: 'Gagal update tanggal penting' });
  }
});

// 🔹 Hapus tanggal penting
router.delete('/:date', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date } = req.params;

  try {
    const deleted = await ImportantDate.destroy({
      where: { userId, date }
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Tanggal tidak ditemukan' });
    }

    res.json({ message: 'Tanggal penting dihapus' });
  } catch (error) {
    console.error('Gagal hapus tanggal penting:', error);
    res.status(500).json({ error: 'Gagal hapus tanggal penting' });
  }
});

export default router;
