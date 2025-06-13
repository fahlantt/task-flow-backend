import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // ✅ Tambahkan ini
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import importantDateRoutes from './routes/importantDateRoutes.js';
import './db.js';

dotenv.config(); // ✅ Load semua variabel dari .env

const app = express();

// ✅ Gunakan PORT dari environment (Render) atau fallback ke 3001 saat lokal
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // 🔁 Ubah agar bisa pakai URL frontend online
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Route default
app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Task Flow!');
});

// Gunakan semua route
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/important-dates', importantDateRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint tidak ditemukan' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
