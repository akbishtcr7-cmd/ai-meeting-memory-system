export const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
export const formatTime = (d) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
export const formatDateTime = (d) => `${formatDate(d)} at ${formatTime(d)}`
export const formatDuration = (mins) => {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60), m = mins % 60
  return m ? `${h}h ${m}m` : `${h}h`
}
export const truncate = (str, len = 100) => str?.length > len ? str.slice(0, len) + '…' : str
export const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??'
export const colorFromString = (s) => {
  const colors = ['bg-accent-600','bg-purple-600','bg-cyan-600','bg-emerald-600','bg-amber-600','bg-pink-600']
  let hash = 0
  for (let i = 0; i < (s?.length || 0); i++) hash = s.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}
export const getMeetingStatusColor = (status) => ({
  upcoming: 'badge-blue', ongoing: 'badge-green', completed: 'badge-purple', cancelled: 'badge-red'
}[status] || 'badge-blue')
