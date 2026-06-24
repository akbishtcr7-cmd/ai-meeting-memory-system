import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiZap, FiCalendar } from 'react-icons/fi'
import { useAI } from '../../hooks/useAI'
import { Spinner } from '../common/Loader'
import { formatDate } from '../../utils/helpers'
import { Link } from 'react-router-dom'

export default function MemorySearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const { semanticSearch, isLoading } = useAI()

  const handleSearch = async () => {
    if (!query.trim()) return
    const data = await semanticSearch(query)
    setResults(data)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Ask a question about your past meetings…"
            className="input-field pl-9"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? <Spinner size="sm" /> : <><FiZap size={15} /> Search</>}
        </button>
      </div>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {results.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">No relevant meetings found</p>
            ) : results.map((result, i) => (
              <motion.div
                key={result._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-4"
              >
                <Link to={`/meetings/${result._id}`} className="font-medium text-slate-200 hover:text-brand-400 transition-colors text-sm">
                  {result.title}
                </Link>
                {result.relevantExcerpt && (
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{result.relevantExcerpt}</p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
                  <FiCalendar size={11} />
                  {formatDate(result.date)}
                  {result.score && (
                    <span className="ml-auto text-brand-400/70">{Math.round(result.score * 100)}% match</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
