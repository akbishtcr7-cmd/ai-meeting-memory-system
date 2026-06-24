import { motion } from 'framer-motion'

export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <div className={`${sizes[size]} border-2 border-white/10 border-t-brand-500 rounded-full animate-spin ${className}`} />
  )
}

export default function Loader({ message = 'Loading…' }) {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <Spinner size="lg" />
        <p className="text-slate-500 text-sm">{message}</p>
      </motion.div>
    </div>
  )
}
