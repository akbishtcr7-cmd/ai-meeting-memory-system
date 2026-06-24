import cloudinary from '../config/cloudinary.js'

export const deleteFile = async (publicId, resourceType = 'raw') => {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export const getFileInfo = async (publicId) => {
  return cloudinary.api.resource(publicId)
}
