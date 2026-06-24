import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiUsers, FiCpu, FiMoreVertical, FiEdit, FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { formatDate, truncate } from '../../utils/helpers'
import { STATUS_COLORS } from '../../utils/constants'

export default function MeetingCard({ meeting, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 hover:border-white/20 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`badge ${STATUS_COLORS[meeting.status] || 'text-slate-400 bg-white/10'}`}>
              {meeting.status?.replace('_', ' ')}
            </span>
            {meeting.summary && (
              <span className="badge text-brand-400 bg-brand-500/10">
                <FiCpu size={10} /> AI Summary
              </span>
            )}
          </div>
          <Link to={`/meetings/${meeting._id}`} className="font-semibold text-slate-100 hover:text-brand-400 transition-colors line-clamp-1">
            {meeting.title}
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
          >
            <FiMoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 glass-card shadow-xl py-1 z-10" onMouseLeave={() => setMenuOpen(false)}>
              <button onClick={() => { onEdit(meeting); setMenuOpen(false) }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 transition-colors">
                <FiEdit size={13} /> Edit
              </button>
              <button onClick={() => { onDelete(meeting._id); setMenuOpen(false) }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                <FiTrash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {meeting.description && (
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{truncate(meeting.description, 120)}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <FiCalendar size={12} />
          {formatDate(meeting.date)}
        </span>
        {meeting.participants?.length > 0 && (
          <span className="flex items-center gap-1.5">
            <FiUsers size={12} />
            {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </motion.div>
  )
}
