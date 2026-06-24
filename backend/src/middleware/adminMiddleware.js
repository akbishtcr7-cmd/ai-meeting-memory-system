import { sendError } from '../utils/sendResponse.js'

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return sendError(res, 'Access denied. Admins only.', 403)
  }
  next()
}
