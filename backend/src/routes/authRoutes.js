import express from 'express'
import {
  register, login, logout, refreshToken,
  forgotPassword, resetPassword, changePassword
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.put('/change-password', protect, changePassword)

export default router
