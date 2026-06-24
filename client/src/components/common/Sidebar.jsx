import { NavLink } from 'react-router-dom'
import { IoBrain, IoGridOutline, IoPeopleOutline, IoSparklesOutline, IoPersonOutline, IoShieldOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard',    path: '/dashboard',    icon: IoGridOutline },
  { label: 'Meetings',     path: '/meetings',     icon: IoPeopleOutline },
  { label: 'AI Assistant', path: '/ai-assistant', icon: IoSparklesOutline },
  { label: 'Profile',      path: '/profile',      icon: IoPersonOutline },
]

export default function Sidebar() {
  const { user }         = useAuth()
  const [open, setOpen]  = useState(false)

  const items = user?.role === 'admin' ? [...navItems, { label: 'Admin', path: '/admin', icon: IoShieldOutline }] : navItems

  const nav = (
    <nav className="flex flex-col gap-1 p-4">
      <div className="flex items-center gap-2 px-4 py-3 mb-4">
        <div className="h-8 w-8 rounded-lg bg-accent-600 flex items-center justify-center">
          <IoBrain className="text-white text-lg" />
        </div>
        <span className="font-bold text-white">MeetMind</span>
      </div>
      {items.map(({ label, path, icon: Icon }) => (
        <NavLink key={path} to={path} onClick={() => setOpen(false)}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Icon className="text-lg flex-shrink-0" />
          <span className="text-sm font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )

  return (
    <>
      <button className="md:hidden fixed top-4 left-4 z-50 btn-ghost p-2 rounded-lg" onClick={() => setOpen(o => !o)}>
        {open ? <IoCloseOutline className="text-xl" /> : <IoMenuOutline className="text-xl" />}
      </button>
      {open && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-dark-900 border-r border-dark-700 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {nav}
      </aside>
    </>
  )
}
