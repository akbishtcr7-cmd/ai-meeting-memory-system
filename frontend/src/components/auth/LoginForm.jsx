import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import { emailValidator, passwordValidator } from '../../utils/validators'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const result = await login(data)
    if (!result.error) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(result.payload || 'Login failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      <h1 className="text-2xl font-bold text-slate-100 mb-1">Sign in</h1>
      <p className="text-slate-500 text-sm mb-8">Welcome back to MeetMind</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              {...register('email', emailValidator)}
              type="email"
              placeholder="you@example.com"
              className={`input-field pl-9 ${errors.email ? 'border-red-500/50' : ''}`}
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              {...register('password', passwordValidator)}
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              className={`input-field pl-9 pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={isLoading} className="w-full justify-center">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">
          Create one
        </Link>
      </p>
    </motion.div>
  )
}
