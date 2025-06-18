import express from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔐 Route untuk mendapatkan data user berdasarkan token
router.get('/me', authenticateToken, getCurrentUser);

export default router;
