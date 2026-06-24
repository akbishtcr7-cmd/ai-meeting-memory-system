import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FiZap } from 'react-icons/fi'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-brand-600/20 via-dark-900 to-dark-900 p-12 border-r border-white/5">
        <div className="flex items-center gap-2.5 mb-auto">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
            <FiZap size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-100">MeetMind</span>
        </div>

        <div className="space-y-8">
          <blockquote className="text-2xl font-medium text-slate-200 leading-snug">
            "Never lose track of what was decided, who's responsible, or what comes next."
          </blockquote>
          <div className="space-y-4">
            {['AI-powered meeting summaries', 'Action item tracking', 'Semantic search across all meetings', 'Ask questions about past meetings'].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-xs mt-auto">Powered by Google Gemini AI</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  )
}
