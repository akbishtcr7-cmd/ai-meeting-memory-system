import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap, FiCpu, FiSearch, FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const features = [
  { icon: FiCpu, title: 'AI Summaries', desc: 'Gemini generates concise summaries, key points, and decisions automatically.' },
  { icon: FiCheckCircle, title: 'Action Items', desc: 'Automatically detect and track action items with assignees and due dates.' },
  { icon: FiSearch, title: 'Semantic Search', desc: 'Ask questions in plain English and find relevant meetings instantly.' },
  { icon: FiZap, title: 'Meeting Memory', desc: 'Never forget what was decided. Query your entire meeting history with AI.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <FiZap size={15} className="text-white" />
          </div>
          <span className="font-bold text-slate-100">MeetMind</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">Sign in</Link>
          <Link to="/register" className="btn-primary text-sm py-2">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            <FiZap size={11} /> Powered by Google Gemini
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-100 leading-tight mb-6">
            Your AI-powered<br />
            <span className="text-brand-400">meeting memory</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10">
            MeetMind captures, summarizes, and remembers every meeting so you never lose a decision, action item, or insight again.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base px-6 py-3">
              Start for free <FiArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-6 py-3">
              Sign in
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center mb-3">
                <f.icon size={17} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
