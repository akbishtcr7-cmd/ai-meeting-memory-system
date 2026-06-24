import { useState, useCallback } from 'react'
import { meetingService } from '../services/meetingService'

export function useMeetingDetails(id) {
  const [meeting, setMeeting] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    if (!id) return
    setLoading(true); setError(null)
    try {
      const { data } = await meetingService.getById(id)
      setMeeting(data.meeting)
    } catch(e) { setError(e.response?.data?.message || 'Failed to load meeting') }
    finally { setLoading(false) }
  }, [id])

  return { meeting, loading, error, fetch, setMeeting }
}
