import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiCpu, FiCheckCircle, FiTrendingUp, FiPlus, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import { useMeetings } from '../hooks/useMeetings'
import MeetingCard from '../components/meetings/MeetingCard'
import Modal from '../components/common/Modal'
import MeetingForm from '../components/meetings/MeetingForm'
import { Spinner } from '../components/common/Loader'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user } = useAuth()
  const { meetings, isLoading, fetchMeetings, createMeeting, deleteMeeting } = useMeetings()
  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => { fetchMeetings({ limit: 6 }) }, [])

  const handleCreate = async (data) => {
    setCreating(true)
    const result = await createMeeting(data)
    setCreating(false)
    if (!result.error) {
      setCreateOpen(false)
      toast.success('Meeting created!')
    }
  }

  const stats = [
    { label: 'Total Meetings', value: meetings.length, icon: FiCalendar, color: 'text-brand-400 bg-brand-500/15' },
    { label: 'AI Summaries', value: meetings.filter(m => m.summary).length, icon: FiCpu, color: 'text-purple-400 bg-purple-500/15' },
    { label: 'Action Items', value: meetings.reduce((sum, m) => sum + (m.actionItems?.length || 0), 0), icon: FiCheckCircle, color: 'text-accent-400 bg-accent-500/15' },
    { label: 'This Month', value: meetings.filter(m => new Date(m.date).getMonth() === new Date().getMonth()).length, icon: FiTrendingUp, color: 'text-yellow-400 bg-yellow-500/15' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with your meetings</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary">
          <FiPlus size={16} /> New meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="stat-card"
          >
            <div>
              <p className="text-slate-500 text-xs font-medium mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-slate-100">{s.value}</p>
            </div>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon size={17} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Meetings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-200">Recent Meetings</h2>
          <Link to="/meetings" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors">
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : meetings.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <FiCalendar size={32} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm mb-4">No meetings yet. Create your first one to get started.</p>
            <button onClick={() => setCreateOpen(true)} className="btn-primary mx-auto">
              <FiPlus size={15} /> Create meeting
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.slice(0, 6).map(m => (
              <MeetingCard
                key={m._id}
                meeting={m}
                onDelete={(id) => { deleteMeeting(id); toast.success('Meeting deleted') }}
                onEdit={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="New Meeting">
        <MeetingForm onSubmit={handleCreate} isLoading={creating} />
      </Modal>
    </div>
  )
}
