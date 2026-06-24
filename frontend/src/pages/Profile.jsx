import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiUser, FiCamera, FiLock, FiSave } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { updateUser } from '../store/slices/authSlice'
import Button from '../components/common/Button'
import uploadService from '../services/uploadService'
import api from '../utils/api'
import { getInitials } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  const fileRef = useRef()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name, email: user?.email },
  })
  const { register: regPass, handleSubmit: handlePass, reset: resetPass, watch, formState: { errors: passErrors } } = useForm()

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarLoading(true)
    try {
      const data = await uploadService.uploadAvatar(file)
      dispatch(updateUser({ avatar: data.url }))
      toast.success('Avatar updated!')
    } catch {
      toast.error('Failed to update avatar')
    } finally {
      setAvatarLoading(false)
    }
  }

  const onProfileSave = async (data) => {
    setProfileLoading(true)
    try {
      const { data: res } = await api.put('/users/profile', data)
      dispatch(updateUser(res.data))
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setProfileLoading(false)
    }
  }

  const onPasswordChange = async (data) => {
    setPassLoading(true)
    try {
      await api.put('/auth/change-password', { currentPassword: data.currentPassword, newPassword: data.newPassword })
      toast.success('Password changed!')
      resetPass()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setPassLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-slate-100">Profile</h1>

      {/* Avatar */}
      <div className="glass-card p-6 flex items-center gap-5">
        <div className="relative">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xl font-bold">
              {getInitials(user?.name)}
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={avatarLoading}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center text-white transition-colors"
          >
            <FiCamera size={13} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div>
          <p className="font-semibold text-slate-100">{user?.name}</p>
          <p className="text-slate-500 text-sm">{user?.email}</p>
          <span className="badge bg-brand-500/10 text-brand-400 mt-1.5">{user?.role}</span>
        </div>
      </div>

      {/* Profile info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiUser size={16} className="text-brand-400" />
          <h2 className="font-semibold text-slate-200">Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit(onProfileSave)} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input {...register('name', { required: 'Name required' })} className={`input-field ${errors.name ? 'border-red-500/50' : ''}`} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input {...register('email', { required: 'Email required' })} type="email" className="input-field" />
          </div>
          <Button type="submit" loading={profileLoading} size="sm">
            <FiSave size={13} /> Save changes
          </Button>
        </form>
      </motion.div>

      {/* Change password */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiLock size={16} className="text-brand-400" />
          <h2 className="font-semibold text-slate-200">Change Password</h2>
        </div>
        <form onSubmit={handlePass(onPasswordChange)} className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input {...regPass('currentPassword', { required: 'Required' })} type="password" placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input {...regPass('newPassword', { required: 'Required', minLength: { value: 8, message: 'Min 8 chars' } })} type="password" placeholder="••••••••" className={`input-field ${passErrors.newPassword ? 'border-red-500/50' : ''}`} />
            {passErrors.newPassword && <p className="text-red-400 text-xs mt-1">{passErrors.newPassword.message}</p>}
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input
              {...regPass('confirmPassword', {
                required: 'Required',
                validate: v => v === watch('newPassword') || 'Passwords do not match',
              })}
              type="password"
              placeholder="••••••••"
              className={`input-field ${passErrors.confirmPassword ? 'border-red-500/50' : ''}`}
            />
            {passErrors.confirmPassword && <p className="text-red-400 text-xs mt-1">{passErrors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" loading={passLoading} size="sm">
            <FiLock size={13} /> Update password
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
