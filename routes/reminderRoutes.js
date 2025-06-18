import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import Reminder from '../models/Reminder.js';

const router = express.Router();

// Tambah reminder
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, description } = req.body;

    const reminder = await Reminder.create({ userId, date, description });
    res.status(201).json(reminder);
  } catch (error) {
    console.error('Gagal tambah pengingat:', error);
    res.status(500).json({ error: 'Gagal tambah pengingat' });
  }
});

// Ambil semua reminder user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reminders = await Reminder.findAll({
      where: { userId },
      order: [['date', 'ASC']],
    });

    res.json(reminders);
  } catch (error) {
    console.error('Gagal ambil pengingat:', error);
    res.status(500).json({ error: 'Gagal ambil pengingat' });
  }
});
