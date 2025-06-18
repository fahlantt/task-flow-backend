import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User berhasil dibuat!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Gagal registrasi', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    res.status(200).json({ message: 'Login berhasil!', token: 'sample-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};
