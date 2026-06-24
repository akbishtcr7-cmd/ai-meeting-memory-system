import api from '../utils/api'
export const authService = {
  login:          (e, p)    => api.post('/auth/login', { email: e, password: p }),
  register:       (d)       => api.post('/auth/register', d),
  logout:         ()        => api.post('/auth/logout'),
  me:             ()        => api.get('/auth/me'),
  forgotPassword: (email)   => api.post('/auth/forgot-password', { email }),
  resetPassword:  (t, p)    => api.post('/auth/reset-password', { token: t, password: p }),
  changePassword: (d)       => api.put('/auth/change-password', d),
  refreshToken:   ()        => api.post('/auth/refresh'),
}
