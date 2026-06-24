export const MEETING_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
}

export const FILE_TYPES = {
  AUDIO: ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
  VIDEO: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
}

export const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

export const PAGE_SIZE = 10

export const STATUS_COLORS = {
  scheduled: 'text-blue-400 bg-blue-400/10',
  in_progress: 'text-yellow-400 bg-yellow-400/10',
  completed: 'text-accent-400 bg-accent-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
}
