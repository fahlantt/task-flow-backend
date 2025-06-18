import db from '../db.js';

const Note = {
  createNote: (userId, content) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO notes (user_id, content) VALUES (?, ?)';
      db.query(query, [userId, content], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getNotesByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC';
      db.query(query, [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

export default Note;
