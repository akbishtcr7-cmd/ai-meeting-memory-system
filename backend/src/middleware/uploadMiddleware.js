import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const meetingStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith('audio/')
    const isVideo = file.mimetype.startsWith('video/')
    return {
      folder: `meetmind/meetings/${req.params.meetingId}`,
      resource_type: isAudio || isVideo ? 'video' : 'raw',
      allowed_formats: ['mp3', 'mp4', 'wav', 'ogg', 'webm', 'pdf', 'doc', 'docx', 'txt'],
    }
  },
})

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'meetmind/avatars',
    resource_type: 'image',
    transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face' }],
  },
})

export const uploadMeetingFile = multer({
  storage: meetingStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
}).single('file')

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'), false)
    cb(null, true)
  },
}).single('avatar')
