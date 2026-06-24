import api from '../utils/api'

const aiService = {
  async generateSummary(meetingId) {
    const { data } = await api.post(`/ai/summarize/${meetingId}`)
    return data.data
  },
  async extractActionItems(meetingId) {
    const { data } = await api.post(`/ai/action-items/${meetingId}`)
    return data.data
  },
  async askQuestion(question, meetingId = null) {
    const { data } = await api.post('/ai/ask', { question, meetingId })
    return data.data
  },
  async semanticSearch(query) {
    const { data } = await api.post('/ai/semantic-search', { query })
    return data.data
  },
  async getMemories(meetingId) {
    const { data } = await api.get(`/ai/memories/${meetingId}`)
    return data.data
  },
}

export default aiService
