import jwt from 'jsonwebtoken';

const secretKey = 'rahasia'; // Samakan dengan yang kamu pakai saat generate token di login

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });

    req.user = user; // Menyimpan informasi user di req
    next();
  });
};

export default authenticateToken;
