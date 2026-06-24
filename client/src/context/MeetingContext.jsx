import { createContext, useContext, useState, useCallback } from 'react'
import api from '../utils/api'

const MeetingContext = createContext(null)

export function MeetingProvider({ children }) {
  const [meetings, setMeetings]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  const fetchMeetings = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await api.get('/meetings', { params })
      setMeetings(data.meetings)
      setPagination({ page: data.page, totalPages: data.totalPages, total: data.total })
    } finally { setLoading(false) }
  }, [])

  const createMeeting = async (payload) => {
    const { data } = await api.post('/meetings', payload)
    setMeetings(m => [data.meeting, ...m])
    return data.meeting
  }

  const updateMeeting = async (id, payload) => {
    const { data } = await api.put(`/meetings/${id}`, payload)
    setMeetings(m => m.map(x => x._id === id ? data.meeting : x))
    return data.meeting
  }

  const deleteMeeting = async (id) => {
    await api.delete(`/meetings/${id}`)
    setMeetings(m => m.filter(x => x._id !== id))
  }

  return (
    <MeetingContext.Provider value={{ meetings, loading, pagination, fetchMeetings, createMeeting, updateMeeting, deleteMeeting }}>
      {children}
    </MeetingContext.Provider>
  )
}

export const useMeetings = () => useContext(MeetingContext)
