import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiCircle, FiUser, FiCalendar } from 'react-icons/fi'
import { formatDate } from '../../utils/helpers'

export default function ActionItems({ items = [], onToggle }) {
  const completed = items.filter(i => i.completed).length

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-200 text-sm">Action Items</h3>
        <span className="text-xs text-slate-500">{completed}/{items.length} done</span>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-600 text-sm text-center py-4">No action items yet</p>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <motion.div
              key={item._id || i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                item.completed ? 'bg-white/3 opacity-60' : 'bg-white/5 hover:bg-white/8'
              }`}
            >
              <button
                onClick={() => onToggle?.(item._id)}
                className={`mt-0.5 flex-shrink-0 transition-colors ${item.completed ? 'text-accent-400' : 'text-slate-600 hover:text-accent-400'}`}
              >
                {item.completed ? <FiCheckCircle size={16} /> : <FiCircle size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${item.completed ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                  {item.task}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  {item.assignee && (
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <FiUser size={10} /> {item.assignee}
                    </span>
                  )}
                  {item.dueDate && (
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <FiCalendar size={10} /> {formatDate(item.dueDate)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
