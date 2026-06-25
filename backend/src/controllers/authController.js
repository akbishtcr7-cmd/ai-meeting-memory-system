import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User.js'
import { generateTokenPair, generateAccessToken } from '../utils/generateToken.js'
import { sendSuccess, sendError } from '../utils/sendResponse.js'
import logger from '../utils/logger.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) return sendError(res, 'Email already in use', 400)

    const user = await User.create({ name, email, password })
    const { accessToken, refreshToken } = generateTokenPair(user._id)

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
    return sendSuccess(res, { ...user.toJSON(), accessToken }, 'Registration successful', 201)
  } catch (err) {
    logger.error('Register error:', err)
    return sendError(res, err.message, 500)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 'Invalid email or password', 401)
    }
    if (!user.isActive) return sendError(res, 'Account deactivated', 403)

    const { accessToken, refreshToken } = generateTokenPair(user._id)
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
    return sendSuccess(res, { ...user.toJSON(), accessToken }, 'Login successful')
  } catch (err) {
    logger.error('Login error:', err)
    return sendError(res, 'Login failed', 500)
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (token) {
      const user = await User.findOne({ refreshToken: token })
      if (user) { user.refreshToken = null; await user.save({ validateBeforeSave: false }) }
    }
    res.clearCookie('refreshToken')
    return sendSuccess(res, null, 'Logged out')
  } catch (err) {
    return sendError(res, 'Logout failed', 500)
  }
}

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (!token) return sendError(res, 'No refresh token', 401)

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id).select('+refreshToken')
    if (!user || user.refreshToken !== token) return sendError(res, 'Invalid refresh token', 401)

    const accessToken = generateAccessToken(user._id)
    return sendSuccess(res, { accessToken }, 'Token refreshed')
  } catch (err) {
    return sendError(res, 'Token refresh failed', 401)
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return sendSuccess(res, null, 'If that email exists, a reset link has been sent')

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000 // 1 hour
    await user.save({ validateBeforeSave: false })

    // TODO: send email with resetToken
    logger.info(`Password reset token for ${user.email}: ${resetToken}`)
    return sendSuccess(res, null, 'Password reset link sent')
  } catch (err) {
    return sendError(res, 'Failed to send reset email', 500)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires')

    if (!user) return sendError(res, 'Token is invalid or has expired', 400)

    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    return sendSuccess(res, null, 'Password reset successful')
  } catch (err) {
    return sendError(res, 'Reset failed', 500)
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')
    if (!(await user.comparePassword(currentPassword))) {
      return sendError(res, 'Current password is incorrect', 400)
    }
    user.password = newPassword
    await user.save()
    return sendSuccess(res, null, 'Password changed successfully')
  } catch (err) {
    return sendError(res, 'Failed to change password', 500)
  }
}
