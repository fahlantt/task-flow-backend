import express from 'express';
import Reminder from '../models/Reminder.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { userId, date, description } = req.body;
  Reminder.createReminder(userId, date, description, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Pengingat ditambahkan' });
  });
});

router.get('/:userId', (req, res) => {
  Reminder.getRemindersByUser(req.params.userId, (err, reminders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(reminders);
  });
});

export default router;
