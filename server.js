import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import importantDateRoutes from './routes/importantDateRoutes.js';
import './db.js';

const app = express();

// ✅ Gunakan port dari environment (Render) atau default ke 3001 saat lokal
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Ganti ke URL frontend Render jika sudah deploy
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
