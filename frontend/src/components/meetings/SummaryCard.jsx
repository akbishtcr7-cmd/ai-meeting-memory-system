import { motion } from 'framer-motion'
import { FiCpu, FiClock } from 'react-icons/fi'
import { timeAgo } from '../../utils/helpers'

export default function SummaryCard({ summary }) {
  if (!summary) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 border-brand-500/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center">
          <FiCpu size={14} className="text-brand-400" />
        </div>
        <span className="font-semibold text-slate-200 text-sm">AI Summary</span>
        {summary.createdAt && (
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-600">
            <FiClock size={11} /> {timeAgo(summary.createdAt)}
          </span>
        )}
      </div>

      {summary.overview && (
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{summary.overview}</p>
      )}

      {summary.keyPoints?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Points</h4>
          <ul className="space-y-1.5">
            {summary.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.decisions?.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Decisions Made</h4>
          <ul className="space-y-1.5">
            {summary.decisions.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
