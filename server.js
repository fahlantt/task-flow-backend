import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import importantDateRoutes from './routes/importantDateRoutes.js';
import './db.js';

const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-flow-frontend-s315-cwrqy1bvy-fahlantts-projects.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // izinkan kalau origin tidak ada (misal tools seperti Postman) atau termasuk dalam allowedOrigins
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

app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
