import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan kalau kamu pakai password
  database: 'task-flow',
});

export default db;
