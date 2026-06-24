import api from '../utils/api'
export const uploadService = {
  uploadFile: (meetingId, file, type, onProgress) => {
    const form = new FormData()
    form.append('file', file)
    form.append('type', type)
    return api.post(`/upload/${meetingId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: e => onProgress?.(Math.round(e.loaded * 100 / e.total))
    })
  },
  uploadProfilePicture: (file) => {
    const form = new FormData()
    form.append('avatar', file)
    return api.post('/upload/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  deleteFile: (meetingId, fileId) => api.delete(`/upload/${meetingId}/${fileId}`),
}
