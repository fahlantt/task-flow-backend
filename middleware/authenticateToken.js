import jwt from 'jsonwebtoken';

// Gunakan JWT_SECRET dari environment variable
const secretKey = process.env.JWT_SECRET || 'defaultsecret'; // 'defaultsecret' hanya untuk jaga-jaga saat development

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }

    req.user = user; // Simpan data user dari token ke req
    next();
  });
};

export default authenticateToken;
