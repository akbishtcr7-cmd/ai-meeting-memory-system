import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { sendError } from '../utils/sendResponse.js'

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return sendError(res, 'Not authorized. No token.', 401)
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user || !user.isActive) return sendError(res, 'User not found or inactive', 401)
    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') return sendError(res, 'Token expired', 401)
    return sendError(res, 'Not authorized', 401)
  }
}
