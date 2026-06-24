export default function Loader({ fullscreen, size = 'md' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  const spinner = (
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-dark-600 border-t-accent-500`} />
  )
  if (fullscreen) return (
    <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-dark-600 border-t-accent-500" />
        <p className="text-gray-400 text-sm">Loading MeetMind…</p>
      </div>
    </div>
  )
  return spinner
}
