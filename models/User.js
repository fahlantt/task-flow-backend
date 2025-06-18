import express from 'express';
import bcrypt from 'bcrypt';
import { connectDB, sequelize } from '../db.js';
import User from '../models/User.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Koneksi dan sinkronisasi database
connectDB();

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Sinkronisasi database berhasil');
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi database:', err);
  });

// Route Registrasi
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Password di-hash otomatis di model melalui hook
    const newUser = await User.create({ email, password });

    res.status(201).json({ message: 'User berhasil dibuat!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat user', error: error.message });
  }
});

// Route Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    const validPassword = await user.validPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    // Kirim response berhasil (token bisa diganti dengan JWT sebenarnya)
    res.status(200).json({ message: 'Login berhasil!', token: 'sample-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
