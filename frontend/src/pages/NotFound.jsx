import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-8xl font-bold text-brand-500/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Page not found</h1>
        <p className="text-slate-500 text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary inline-flex">
          <FiArrowLeft size={15} /> Back to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
