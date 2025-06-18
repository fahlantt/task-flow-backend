import db from '../db.js';

const Task = {
  createTask: (userId, title, due_date, callback) => {
    const sql = 'INSERT INTO tasks (user_id, title, due_date) VALUES (?, ?, ?)';
    db.query(sql, [userId, title, due_date], callback);
  },

  getTasksByUser: (userId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC';
    db.query(sql, [userId], callback);
  }
};

export default Task;
