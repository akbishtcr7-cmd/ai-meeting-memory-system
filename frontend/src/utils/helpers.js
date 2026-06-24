import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date) => format(new Date(date), 'MMM dd, yyyy')
export const formatDateTime = (date) => format(new Date(date), 'MMM dd, yyyy HH:mm')
export const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true })

export const truncate = (str, len = 100) =>
  str?.length > len ? str.slice(0, len) + '…' : str

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export const getInitials = (name) =>
  name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

export const classNames = (...classes) => classes.filter(Boolean).join(' ')
