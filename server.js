import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import importantDateRoutes from './routes/importantDateRoutes.js';

// Import koneksi Sequelize dan semua model
import sequelize from './db.js';
import './models/User.js';
import './models/Note.js';
import './models/Task.js';
import './models/Reminder.js';
import './models/ImportantDate.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-flow-frontend-s315.vercel.app',
  'https://task-flow-frontend-s315-git-main-fahlantts-projects.vercel.app',
  'https://task-flow-frontend-s315-9r00bgrb9-fahlantts-projects.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Task Flow!');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/important-dates', importantDateRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint tidak ditemukan' });
});

// 🔧 Sinkronisasi Sequelize (otomatis buat tabel)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Semua tabel berhasil disinkronkan');
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Gagal menyinkronkan database:', err);
  });
