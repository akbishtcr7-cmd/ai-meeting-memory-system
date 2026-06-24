import User from '../models/User.js'
import Meeting from '../models/Meeting.js'
import { sendSuccess, sendError } from '../utils/sendResponse.js'
import cloudinary from '../config/cloudinary.js'

export const getProfile = async (req, res) => {
  return sendSuccess(res, req.user)
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    )
    return sendSuccess(res, user, 'Profile updated')
  } catch (err) {
    return sendError(res, err.message, 400)
  }
}

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400)
    const user = await User.findById(req.user._id)

    // Delete old avatar from Cloudinary
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId)
    }

    user.avatar = req.file.path
    user.avatarPublicId = req.file.filename
    await user.save()

    return sendSuccess(res, { url: user.avatar }, 'Avatar updated')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

// Admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    return sendSuccess(res, users)
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const getUserStats = async (req, res) => {
  try {
    const [totalUsers, totalMeetings, totalSummaries] = await Promise.all([
      User.countDocuments(),
      Meeting.countDocuments(),
      Meeting.countDocuments({ 'summary.overview': { $exists: true, $ne: null } }),
    ])
    return sendSuccess(res, { totalUsers, totalMeetings, totalSummaries })
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return sendError(res, 'User not found', 404)
    await Meeting.deleteMany({ createdBy: user._id })
    await user.deleteOne()
    return sendSuccess(res, null, 'User deleted')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}
