import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET || 'rahasia';

// ✅ Register User
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User berhasil dibuat!', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Gagal registrasi', error: error.message });
  }
};

// ✅ Login User & generate JWT
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login berhasil!', token });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};

// ✅ Ambil user dari token
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Tidak ada token atau token tidak valid' });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: error.message });
  }
};
