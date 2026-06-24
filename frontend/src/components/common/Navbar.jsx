import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBell, FiSearch, FiLogOut, FiUser, FiSettings, FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'

export default function Navbar({ onMenuToggle, sidebarOpen }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="h-16 bg-dark-900/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search meetings…"
            className="input-field pl-9 py-2 text-sm"
            onFocus={() => navigate('/meetings')}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors relative">
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-500/30 flex items-center justify-center text-brand-400 text-xs font-semibold">
                {getInitials(user?.name)}
              </div>
            )}
            <span className="hidden sm:block text-sm text-slate-300 font-medium">{user?.name?.split(' ')[0]}</span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-48 glass-card shadow-xl shadow-black/30 py-1 z-50"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <FiUser size={14} /> Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <FiSettings size={14} /> Settings
                </Link>
                <div className="border-t border-white/10 my-1" />
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <FiLogOut size={14} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
