import api from '../utils/api'

const uploadService = {
  async uploadFile(meetingId, file, onProgress) {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post(`/upload/meeting/${meetingId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total))
      },
    })
    return data.data
  },
  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await api.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
  async deleteFile(publicId) {
    await api.delete(`/upload/file/${publicId}`)
  },
}

export default uploadService
