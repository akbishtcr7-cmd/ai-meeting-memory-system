import express from 'express'
import { uploadMeetingFile, deleteFile } from '../controllers/uploadController.js'
import { protect } from '../middleware/authMiddleware.js'
import { uploadMeetingFile as multerUpload, uploadAvatar } from '../middleware/uploadMiddleware.js'
import { updateProfile } from '../controllers/userController.js'

const router = express.Router()

router.use(protect)

router.post('/meeting/:meetingId', multerUpload, uploadMeetingFile)
router.post('/avatar', uploadAvatar, updateProfile)
router.delete('/file/:publicId', deleteFile)

export default router
