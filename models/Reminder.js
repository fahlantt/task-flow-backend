import db from '../db.js';

const Reminder = {
  createReminder: (userId, date, description, callback) => {
    const sql = 'INSERT INTO reminders (user_id, date, description) VALUES (?, ?, ?)';
    db.query(sql, [userId, date, description], callback);
  },

  getRemindersByUser: (userId, callback) => {
    const sql = 'SELECT * FROM reminders WHERE user_id = ? ORDER BY date ASC';
    db.query(sql, [userId], callback);
  }
};

export default Reminder;
