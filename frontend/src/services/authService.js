import api from '../utils/api'

const authService = {
  async register(userData) {
    const { data } = await api.post('/auth/register', userData)
    return data.data
  },
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data.data
  },
  async logout() {
    await api.post('/auth/logout')
    localStorage.removeItem('user')
  },
  async forgotPassword(email) {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  },
  async resetPassword(token, password) {
    const { data } = await api.post(`/auth/reset-password/${token}`, { password })
    return data
  },
  async changePassword(passwords) {
    const { data } = await api.put('/auth/change-password', passwords)
    return data
  },
  async refreshToken() {
    const { data } = await api.post('/auth/refresh-token')
    return data
  },
}

export default authService
