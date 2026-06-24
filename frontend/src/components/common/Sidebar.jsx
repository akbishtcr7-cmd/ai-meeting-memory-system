import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiCalendar, FiCpu, FiUser, FiShield,
  FiZap, FiX
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/meetings', icon: FiCalendar, label: 'Meetings' },
  { to: '/ai-assistant', icon: FiCpu, label: 'AI Assistant' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
]

export default function Sidebar({ open, onClose }) {
  const { isAdmin } = useAuth()

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <FiZap size={16} className="text-white" />
        </div>
        <span className="font-semibold text-slate-100 text-base tracking-tight">MeetMind</span>
        <button
          onClick={onClose}
          className="ml-auto lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
        >
          <FiX size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <FiShield size={17} />
            Admin Panel
          </NavLink>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5">
        <div className="glass-card p-3 text-xs text-slate-500 text-center">
          Powered by Google Gemini
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-56 bg-dark-850/60 border-r border-white/5 fixed left-0 top-0 h-full z-20 backdrop-blur-sm">
        {content}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -224 }}
              animate={{ x: 0 }}
              exit={{ x: -224 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-56 bg-dark-850 border-r border-white/5 z-50 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
