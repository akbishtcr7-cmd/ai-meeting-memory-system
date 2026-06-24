import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import authService from '../../services/authService'
import Button from '../common/Button'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async ({ email }) => {
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setSent(true)
      toast.success('Reset email sent!')
    } catch {
      toast.error('Could not send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
      <Link to="/login" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors">
        <FiArrowLeft size={14} /> Back to sign in
      </Link>

      {sent ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">
            <FiMail size={24} className="text-accent-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">Check your email</h2>
          <p className="text-slate-500 text-sm">We've sent a password reset link to your email address.</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Reset password</h1>
          <p className="text-slate-500 text-sm mb-8">Enter your email and we'll send a reset link</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  {...register('email', { required: 'Email required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                  type="email"
                  placeholder="you@example.com"
                  className={`input-field pl-9 ${errors.email ? 'border-red-500/50' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <Button type="submit" loading={loading} className="w-full justify-center">Send reset link</Button>
          </form>
        </>
      )}
    </motion.div>
  )
}
