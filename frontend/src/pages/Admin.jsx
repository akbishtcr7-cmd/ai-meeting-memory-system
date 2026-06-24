import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiCalendar, FiTrash2, FiShield, FiActivity } from 'react-icons/fi'
import api from '../utils/api'
import { Spinner } from '../components/common/Loader'
import { formatDate, getInitials } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          api.get('/users'),
          api.get('/users/stats'),
        ])
        setUsers(usersRes.data.data)
        setStats(statsRes.data.data)
      } catch {
        toast.error('Failed to load admin data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user and all their data?')) return
    try {
      await api.delete(`/users/${id}`)
      setUsers(prev => prev.filter(u => u._id !== id))
      toast.success('User deleted')
    } catch {
      toast.error('Failed to delete user')
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers ?? users.length, icon: FiUsers, color: 'text-brand-400 bg-brand-500/15' },
    { label: 'Total Meetings', value: stats?.totalMeetings ?? 0, icon: FiCalendar, color: 'text-purple-400 bg-purple-500/15' },
    { label: 'AI Summaries', value: stats?.totalSummaries ?? 0, icon: FiActivity, color: 'text-accent-400 bg-accent-500/15' },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: FiShield, color: 'text-yellow-400 bg-yellow-500/15' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Admin Panel</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage users and system analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
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

      {/* Users table */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
          <FiUsers size={15} className="text-brand-400" />
          <h2 className="font-semibold text-slate-200 text-sm">All Users</h2>
          <span className="ml-auto text-xs text-slate-500">{users.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-semibold">
                          {getInitials(u.name)}
                        </div>
                      )}
                      <span className="text-slate-200 font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`badge ${u.role === 'admin' ? 'text-yellow-400 bg-yellow-500/10' : 'text-slate-400 bg-white/5'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{formatDate(u.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
