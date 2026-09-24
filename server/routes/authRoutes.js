import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  demoLogin,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/demo', demoLogin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
