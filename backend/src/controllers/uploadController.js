import Meeting from '../models/Meeting.js'
import cloudinary from '../config/cloudinary.js'
import { sendSuccess, sendError } from '../utils/sendResponse.js'

export const uploadMeetingFile = async (req, res) => {
  try {
    if (!req.file) return sendError(res, 'No file provided', 400)

    const meeting = await Meeting.findOne({ _id: req.params.meetingId, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)

    meeting.files.push({
      url: req.file.path,
      publicId: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.file.mimetype,
      size: req.file.size,
    })
    await meeting.save()

    return sendSuccess(res, { url: req.file.path, meeting }, 'File uploaded')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const deleteFile = async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId)
    return sendSuccess(res, null, 'File deleted')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}
