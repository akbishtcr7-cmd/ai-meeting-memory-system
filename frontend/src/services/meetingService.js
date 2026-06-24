import api from '../utils/api'

const meetingService = {
  async getMeetings(params = {}) {
    const { data } = await api.get('/meetings', { params })
    return data.data
  },
  async getMeeting(id) {
    const { data } = await api.get(`/meetings/${id}`)
    return data.data
  },
  async createMeeting(meetingData) {
    const { data } = await api.post('/meetings', meetingData)
    return data.data
  },
  async updateMeeting(id, meetingData) {
    const { data } = await api.put(`/meetings/${id}`, meetingData)
    return data.data
  },
  async deleteMeeting(id) {
    await api.delete(`/meetings/${id}`)
  },
  async searchMeetings(query) {
    const { data } = await api.get('/meetings/search', { params: { q: query } })
    return data.data
  },
}

export default meetingService
