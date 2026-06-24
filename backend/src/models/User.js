import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: null },
    avatarPublicId: { type: String, default: null },
    refreshToken: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.refreshToken
  delete obj.passwordResetToken
  delete obj.passwordResetExpires
  return obj
}

export default mongoose.model('User', userSchema)
