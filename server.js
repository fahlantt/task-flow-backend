import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import importantDateRoutes from './routes/importantDateRoutes.js'; // <== tambahkan ini setelah deklarasi express
import './db.js';

const app = express(); // <== pastikan deklarasi app ada sebelum app.use

const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Route default
app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Task Flow!');
});

// Gunakan route
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/important-dates', importantDateRoutes); // ✅ Tambahkan ini setelah deklarasi app

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
