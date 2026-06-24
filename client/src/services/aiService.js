import api from '../utils/api'
export const aiService = {
  summarize:      (meetingId) => api.post(`/ai/summarize/${meetingId}`),
  extractMemory:  (meetingId) => api.post(`/ai/memory/${meetingId}`),
  semanticSearch: (query)     => api.post('/ai/search', { query }),
  askQuestion:    (question, meetingIds) => api.post('/ai/ask', { question, meetingIds }),
  getMemories:    (meetingId) => api.get(`/ai/memories/${meetingId}`),
  getSummary:     (meetingId) => api.get(`/ai/summary/${meetingId}`),
}
