import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi'
import { useMeetings } from '../hooks/useMeetings'
import MeetingCard from '../components/meetings/MeetingCard'
import Modal from '../components/common/Modal'
import MeetingForm from '../components/meetings/MeetingForm'
import { Spinner } from '../components/common/Loader'
import toast from 'react-hot-toast'
import { MEETING_STATUS } from '../utils/constants'

export default function Meetings() {
  const { meetings, isLoading, fetchMeetings, createMeeting, updateMeeting, deleteMeeting } = useMeetings()
  const [createOpen, setCreateOpen] = useState(false)
  const [editMeeting, setEditMeeting] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => { fetchMeetings() }, [])

  const handleCreate = async (data) => {
    setSubmitting(true)
    const result = await createMeeting(data)
    setSubmitting(false)
    if (!result.error) { setCreateOpen(false); toast.success('Meeting created!') }
  }

  const handleUpdate = async (data) => {
    setSubmitting(true)
    const result = await updateMeeting(editMeeting._id, data)
    setSubmitting(false)
    if (!result.error) { setEditMeeting(null); toast.success('Meeting updated!') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this meeting?')) return
    await deleteMeeting(id)
    toast.success('Deleted')
  }

  const filtered = meetings.filter(m => {
    const matchSearch = !search || m.title?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100">Meetings</h1>
        <button onClick={() => setCreateOpen(true)} className="btn-primary">
          <FiPlus size={16} /> New meeting
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search meetings…"
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="input-field py-2 text-sm w-auto pr-8"
        >
          <option value="">All statuses</option>
          {Object.values(MEETING_STATUS).map(s => (
            <option key={s} value={s} className="bg-dark-800">
              {s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-slate-500 text-sm">
            {search || statusFilter ? 'No meetings match your filters.' : 'No meetings yet. Create one to get started.'}
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map(m => (
            <MeetingCard
              key={m._id}
              meeting={m}
              onDelete={handleDelete}
              onEdit={setEditMeeting}
            />
          ))}
        </motion.div>
      )}

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="New Meeting">
        <MeetingForm onSubmit={handleCreate} isLoading={submitting} />
      </Modal>
      <Modal isOpen={!!editMeeting} onClose={() => setEditMeeting(null)} title="Edit Meeting">
        <MeetingForm onSubmit={handleUpdate} initialData={editMeeting} isLoading={submitting} />
      </Modal>
    </div>
  )
}
