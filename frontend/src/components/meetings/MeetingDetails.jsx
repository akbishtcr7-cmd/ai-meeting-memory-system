import { FiCalendar, FiUsers, FiFileText, FiPaperclip } from 'react-icons/fi'
import { formatDateTime } from '../../utils/helpers'
import { STATUS_COLORS } from '../../utils/constants'

export default function MeetingDetails({ meeting }) {
  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <span className={`badge ${STATUS_COLORS[meeting.status] || 'bg-white/10 text-slate-400'}`}>
          {meeting.status?.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2.5 text-slate-400">
          <FiCalendar size={15} className="text-brand-400 flex-shrink-0" />
          <span>{formatDateTime(meeting.date)}</span>
        </div>
        {meeting.participants?.length > 0 && (
          <div className="flex items-start gap-2.5 text-slate-400">
            <FiUsers size={15} className="text-brand-400 flex-shrink-0 mt-0.5" />
            <span>{meeting.participants.join(', ')}</span>
          </div>
        )}
      </div>

      {meeting.description && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FiFileText size={12} /> Description
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">{meeting.description}</p>
        </div>
      )}

      {meeting.files?.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FiPaperclip size={12} /> Attachments
          </h4>
          <div className="space-y-2">
            {meeting.files.map((file, i) => (
              <a
                key={i}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-slate-300"
              >
                <FiPaperclip size={13} className="text-slate-500" />
                {file.originalName || file.url.split('/').pop()}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
