import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
            className={`relative w-full ${sizes[size]} glass-card p-6 z-10`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button onClick={onClose} className="btn-ghost p-2 rounded-lg"><IoClose className="text-xl" /></button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
