import api from '../utils/api'
export const meetingService = {
  getAll:    (p)     => api.get('/meetings', { params: p }),
  getById:   (id)    => api.get(`/meetings/${id}`),
  create:    (d)     => api.post('/meetings', d),
  update:    (id, d) => api.put(`/meetings/${id}`, d),
  delete:    (id)    => api.delete(`/meetings/${id}`),
  search:    (q)     => api.get('/meetings/search', { params: { q } }),
  getStats:  ()      => api.get('/meetings/stats'),
}
