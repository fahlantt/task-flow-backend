import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // ⬅️ Untuk membaca variabel dari file .env

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'task-flow',
});

export default db;
