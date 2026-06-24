import express from 'express'
import {
  getProfile, updateProfile, uploadAvatar,
  getAllUsers, getUserStats, deleteUser
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'
import { uploadAvatar as avatarUpload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/profile', getProfile)
router.put('/profile', updateProfile)
router.post('/avatar', avatarUpload, uploadAvatar)

// Admin
router.get('/', adminOnly, getAllUsers)
router.get('/stats', adminOnly, getUserStats)
router.delete('/:id', adminOnly, deleteUser)

export default router
