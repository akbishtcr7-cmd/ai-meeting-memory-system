import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoBrain, IoSearchOutline, IoNotificationsOutline, IoMoonOutline, IoSunnyOutline, IoChevronDown } from 'react-icons/io5'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { getInitials, colorFromString } from '../../utils/helpers'

export default function Navbar() {
  const { user, logout }    = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate            = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  return (
    <header className="h-16 border-b border-dark-700 bg-dark-900/80 backdrop-blur-md flex items-center px-6 gap-4 sticky top-0 z-30">
      <Link to="/" className="flex items-center gap-2 mr-4">
        <div className="h-8 w-8 rounded-lg bg-accent-600 flex items-center justify-center">
          <IoBrain className="text-white text-lg" />
        </div>
        <span className="font-bold text-white text-lg hidden sm:block">MeetMind</span>
      </Link>

      <div className="flex-1 max-w-md relative hidden md:block">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search meetings, summaries…"
          className="input-field pl-10 py-2 text-sm"
          onKeyDown={e => e.key === 'Enter' && navigate(`/meetings?q=${e.target.value}`)} />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="btn-ghost p-2 rounded-lg" onClick={toggleTheme}>
          {theme === 'dark' ? <IoSunnyOutline className="text-xl" /> : <IoMoonOutline className="text-xl" />}
        </button>
        <button className="btn-ghost p-2 rounded-lg relative">
          <IoNotificationsOutline className="text-xl" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent-500 rounded-full" />
        </button>
        {user && (
          <div className="relative">
            <button onClick={() => setDropdown(d => !d)} className="flex items-center gap-2 btn-ghost px-3 py-2 rounded-xl">
              <div className={`h-8 w-8 rounded-lg ${colorFromString(user.name)} flex items-center justify-center text-white text-xs font-bold`}>
                {user.avatar ? <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-lg object-cover" /> : getInitials(user.name)}
              </div>
              <span className="text-sm font-medium text-gray-200 hidden sm:block">{user.name?.split(' ')[0]}</span>
              <IoChevronDown className="text-xs text-gray-400" />
            </button>
            {dropdown && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-52 glass-card py-2 shadow-xl z-50">
                <div className="px-4 py-2 border-b border-dark-600 mb-1">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                {[['Profile', '/profile'], ['Dashboard', '/dashboard'], user.role === 'admin' ? ['Admin Panel', '/admin'] : null].filter(Boolean).map(([label, path]) => (
                  <button key={path} onClick={() => { navigate(path); setDropdown(false) }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                    {label}
                  </button>
                ))}
                <div className="border-t border-dark-600 mt-1 pt-1">
                  <button onClick={() => { logout(); setDropdown(false) }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors">
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
